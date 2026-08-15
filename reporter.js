import fs from 'node:fs/promises'

export async function dataCatcherReport(gitData, name) {
    
    try {
        const filter = gitData.filter(gitRepo => !gitRepo.fork && gitRepo.stargazers_count > 1);
        const cLines = filter.map(gitRepo => `\nREPO: ${gitRepo.name.toUpperCase()}\n ⭐ Stars: ${gitRepo.stargazers_count}\n 📃 Lang: ${gitRepo.language || 'null'}\n 📎 Forks: ${gitRepo.forks || 0}`)
        const stars = filter.reduce((acc, gitRepo) => acc + gitRepo.stargazers_count, 0);
        const forks = filter.reduce((acc, gitRepo) => acc + gitRepo.forks, 0)
        const content = `${cLines.join('\n')}\n\n⭐ Total Stars: ${stars}\n📎 Total forks: ${forks}`;

        const file = `../fragmentos/reportGit_${name}.txt`
            await fs.writeFile(file, content);
            return file;

        } catch(error) {
            throw error;
    }
}
