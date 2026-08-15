import { cliApiManagement } from "./api.js"
import { dataCatcherReport } from "./reporter.js"

const usrArgs = process.argv.slice(2);
const parsedArgs = usrArgs.reduce((acc, arg) => {

    if (arg.startsWith('--')) {
        const [key, val] = arg.replace('--', '').split('=');
        acc[key] = val || true;
    }
    return acc;
}, {});

const name = parsedArgs.user || 'github';

console.log(name);

async function fetcher() {

    try {
        console.log(`Obteniendo datos para: ${name}. (Aguarde...)`);

        const apiData = await cliApiManagement(name);
        const Catcherpath = await dataCatcherReport(apiData, name)

        console.log(`(SUCCESS)\nGuardando reporte en: ${Catcherpath}`);


    } catch(error) {
        throw error;
        console.error(`Error:, ${error.message}`)

    }
}

fetcher();

// MAÑANA: DIA 30: Retrospectiva del mes.