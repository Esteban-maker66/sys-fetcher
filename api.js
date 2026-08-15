export async function cliApiManagement(gitUser) {
    
    try {
        if (!gitUser) {
            console.log('- ERR: Name not found, introduce a valid one')
        }

        const response = await fetch(`https://api.github.com/users/${gitUser}/repos?per_page=100`)

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`ERR: the github user ${gitUser} was not found (404)`)
            }
            throw new Error(`ERR HTTP at: ${response.status}`);
        }
        
        const data = await response.json();

        return data;

    } catch(error) {
        throw error;
    }
}
