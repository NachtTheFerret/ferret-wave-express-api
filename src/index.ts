import { variables } from './dotenv';
import { sequelize } from './database';
import { server } from './server';

(async () => {
  await sequelize.sync(); // ({ force: true });

  server.listen(variables.PORT, () => {
    console.log(`Server is running on http://localhost:${variables.PORT}`);
  });
})();
