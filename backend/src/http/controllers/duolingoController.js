
const https = require('https');

class DuolingoController {
    async getData(req, res) {
        // link do duolingo
        const url = 'https://www.duolingo.com/2017-06-30/users/357551189?fields=courses,creationDate,fromLanguage,gemsConfig,globalAmbassadorStatus,hasPlus,id,learningLanguage,location,name,picture,privacySettings,roles,streak,streakData%7BcurrentStreak,previousStreak%7D,subscriberLevel,totalXp,username';

        const options = {
            headers: {
                // User-Agent é importante para não ser bloqueado
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(url, options, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                try {
                    // Se o status não for 200, pode ser erro
                    if (resp.statusCode !== 200) {
                        return res.status(resp.statusCode).json({ error: 'Erro ao buscar dados no Duolingo', statusCode: resp.statusCode });
                    }
                    const json = JSON.parse(data);
                    res.status(200).json(json);
                } catch (e) {
                    console.error(e);
                    res.status(500).json({ error: 'Erro ao processar JSON do Duolingo' });
                }
            });

        }).on("error", (err) => {
            console.error(err);
            res.status(500).json({ error: 'Erro na conexão com Duolingo' });
        });
    }
}

module.exports = new DuolingoController();
