import { config } from './config'

import app from './app'

app.listen(config.PORT, () => {
    console.log(`Web server is running ${config.PORT}`)
   })


