import { ConfigModule } from '@nestjs/config'
import dbConfiguration from './db.config'
import { DataSource, DataSourceOptions } from 'typeorm'

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
})

const AppDataSource = new DataSource(dbConfiguration() as DataSourceOptions)

export default AppDataSource
