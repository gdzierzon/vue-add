import arg from 'arg'
import fs from 'fs'

function displayHelp()
{
    console.log(`
Options: vue-add [ObjectName] [-c] [-v] [-s]
    [ObjectName]    This is a required parameter. This is the name of the 
                    component, view or service to be created.
                    
                    Ex: ProductList, ProfileView, AuthenticationService
                   
    -c, --component Indicates that the type of object to be created is a component
                    (If no object type is selected, component is the default)
                    These files will be created for the following command:
                    
                    vue-add ProductList -c
                    src
                        components
                            product-list
                                product-list.css
                                product-list.js
                                ProductList.vue
                        
    -v, --view      Indicates that the type of object to be created is a view
                    These files will be created for the following command:
                    
                    vue-add ProfileView -v
                    src
                        views
                            profile-view
                                profile-view.css
                                profile-view.js
                                ProfileView.vue
                        
    -s, --service   Indicates that the type of object to be created is a service
                    This is the file that will be created for the following command:
                    
                    vue-add AuthenticationService -s
                    src
                        services
                            authentication-service.js
`)
}

function parseArgs(rawArgs) {
    const args = arg(
        {
            '--component': Boolean,
            '--view': Boolean,
            '--service': Boolean,
            '--help': Boolean,

            '-c': '--component',
            '-v': '--view',
            '-s': '--service',
            '-h': '--help'
        },
        {
            argv: rawArgs.slice(2)
        }
    )

    const template = {
        path: args._[0],
        root: 'components',
        isService: false,
        help: args['--help']
    }

    if(args['--view'])
    {
        template.root = 'views'
    }
    else if(args['--service'])
    {
        template.root = 'services'
        template.isService = true
    }

    return template
}

export function cli(args)
{
    const options = parseArgs(args)

    try
    {
        if (options.help)
        {
            displayHelp()
        }
        else if (options.path)
        {
            const lowerPath = options.path.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

            const className = getFileName(options.path)
            const fileName = getFileName(lowerPath)
            const path = createDirectory(lowerPath, options.root, options.isService)

            if (options.isService)
            {
                writeService(path, fileName, className)
            }
            else
            {
                writeVue(path, fileName, className)
                writeCSS(path, fileName)
                writeJavaScript(path, fileName)
            }

        }
    }
    catch
    {
        displayHelp()
    }
}


function getFileName(path)
{
    const arr = path.split("/")
    return arr[arr.length - 1]
}

function createDirectory(fileName, root, isService)
{
    const paths = fileName.split("/")
    if(isService) paths.pop()

    paths.unshift(root)
    paths.unshift("src")

    let path = "."
    for(let dir of paths)
    {
        path += `/${dir}`
        if(!fs.existsSync(path))
        {
            fs.mkdirSync(path)
        }
    }

    return path
}

function writeService(path, fileName, className)
{
    const content = `import axios from "axios"

class ${className} 
{
    get(id)
    {
        return axios.get(\`/\${id}\`)
    }
}

export default new ${className}()`

    fs.writeFile(`${path}/${fileName}.js`, content, err =>
    {
        if (err)
        {
            console.error(err)
        }
    })
}

function writeVue(path, fileName, vueName)
{
    const content = `<script src="./${fileName}.js"></script>
<style src="./${fileName}.css" scoped></style>

<template>
    <div id="${fileName}">
    
    </div>
</template>
`

    fs.writeFile(`${path}/${vueName}.vue`, content, err =>
    {
        if (err)
        {
            console.error(err)
        }
    })
}

function writeJavaScript(path, fileName)
{
    const content = `export default {\n\tname: "${fileName}",\n\tcomponents: {},\n\tdata() {\n\t\treturn {}\n\t},\n\tcreated() {},\n\tcomputed: {},\n\tmethods: {}\n}`

    fs.writeFile(`${path}/${fileName}.js`, content, err =>
    {
        if (err)
        {
            console.error(err)
        }
    })
}

function writeCSS(path, fileName)
{
    const content = ``

    fs.writeFile(`${path}/${fileName}.css`, content, err =>
    {
        if (err)
        {
            console.error(err)
        }
    })
}
