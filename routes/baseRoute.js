/**
 * @category   Base Router
 * @package    Soulcio
 * @copyright  Copyright (c) 2018 Media intellects Inc. All rights reserved.
 * @license    http://www.mediaintellects.com/license/
 * @author     Media Intellects Inc. <info@mediaintellects.com>
 * The contents of this file represent Media Intellects trade secrets and are confidential.
 * Use outside of Media Intellects is prohibited and in violation of copyright laws.
 */

'use strict';

const apiRouter = require('./apiRouter');
const DevRouter = require('./devRouter');

module.exports = (options) => {
  const app = options.app;
  const config = options.config;
  const logger = options.logger;

  app.all('*', (req, res, next) => {
    logger.info(`Requesting ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
  });

  app.get('/', (req, res) => {
    res.send(`
<html>
    <body style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center">
    <pre>

                                                                                                                                    
                                                                                                                                    
   SSSSSSSSSSSSSSS      OOOOOOOOO     UUUUUUUU     UUUUUUUULLLLLLLLLLL                    CCCCCCCCCCCCCIIIIIIIIII     OOOOOOOOO     
 SS:::::::::::::::S   OO:::::::::OO   U::::::U     U::::::UL:::::::::L                 CCC::::::::::::CI::::::::I   OO:::::::::OO   
S:::::SSSSSS::::::S OO:::::::::::::OO U::::::U     U::::::UL:::::::::L               CC:::::::::::::::CI::::::::I OO:::::::::::::OO 
S:::::S     SSSSSSSO:::::::OOO:::::::OUU:::::U     U:::::UULL:::::::LL              C:::::CCCCCCCC::::CII::::::IIO:::::::OOO:::::::O
S:::::S            O::::::O   O::::::O U:::::U     U:::::U   L:::::L               C:::::C       CCCCCC  I::::I  O::::::O   O::::::O
S:::::S            O:::::O     O:::::O U:::::D     D:::::U   L:::::L              C:::::C                I::::I  O:::::O     O:::::O
 S::::SSSS         O:::::O     O:::::O U:::::D     D:::::U   L:::::L              C:::::C                I::::I  O:::::O     O:::::O
  SS::::::SSSSS    O:::::O     O:::::O U:::::D     D:::::U   L:::::L              C:::::C                I::::I  O:::::O     O:::::O
    SSS::::::::SS  O:::::O     O:::::O U:::::D     D:::::U   L:::::L              C:::::C                I::::I  O:::::O     O:::::O
       SSSSSS::::S O:::::O     O:::::O U:::::D     D:::::U   L:::::L              C:::::C                I::::I  O:::::O     O:::::O
            S:::::SO:::::O     O:::::O U:::::D     D:::::U   L:::::L              C:::::C                I::::I  O:::::O     O:::::O
            S:::::SO::::::O   O::::::O U::::::U   U::::::U   L:::::L         LLLLLLC:::::C       CCCCCC  I::::I  O::::::O   O::::::O
SSSSSSS     S:::::SO:::::::OOO:::::::O U:::::::UUU:::::::U LL:::::::LLLLLLLLL:::::L C:::::CCCCCCCC::::CII::::::IIO:::::::OOO:::::::O
S::::::SSSSSS:::::S OO:::::::::::::OO   UU:::::::::::::UU  L::::::::::::::::::::::L  CC:::::::::::::::CI::::::::I OO:::::::::::::OO 
S:::::::::::::::SS    OO:::::::::OO       UU:::::::::UU    L::::::::::::::::::::::L    CCC::::::::::::CI::::::::I   OO:::::::::OO   
 SSSSSSSSSSSSSSS        OOOOOOOOO           UUUUUUUUU      LLLLLLLLLLLLLLLLLLLLLLLL       CCCCCCCCCCCCCIIIIIIIIII     OOOOOOOOO     
                                                                                                                                    
                                                                                                                                    
                                                                                                                                    
                                                                                                                                    

        </pre>
        <h1 style="font-size: 48px;">APP SERVER</h1>
        <h2>Authorized Users Only</h2>
        <p>&copy;${new Date().getFullYear()} Soulcio. All Rights Reserved</p>
    </body>
</html>
`);
  });

  const router = apiRouter(options);
  const devRouter = DevRouter(options);

  app.use(config.basePath, router);
  app.use(config.devPath, devRouter);

};
