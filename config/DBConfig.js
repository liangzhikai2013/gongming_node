const config = {
    // 启动端口
    port: 3000,
    // 数据库配置
    database: {
        DATABASE: 'gongming',
        USERNAME: 'root',
        PASSWORD: 'Liang321',
        PORT: '26115',
        HOST: 'bj-cynosdbmysql-grp-0vks626u.sql.tencentcdb.com',
        insecureAuth : true,
        useConnectionPooling: true
    }
}

module.exports = config