/**
 * Модуль содержит ключи интеграции и другие конфигурации
 */
const config = {
	// данные для api amocrm
	CLIENT_ID: "10afe6f8-6eca-4228-89bb-b5f7c207b6ce",
	CLIENT_SECRET: "genBuFRO6Vn98pYgOnMz3fDz8PP2HhSfscqy5Jbr9zmF3K6Ht53TNuygFTOF11RQ",
	//AUTH_CODE живет 20 минут, при перезапуске скрипта нужно брать новый
	AUTH_CODE: "def50200c1c754e06c6e381715ab360badc232541e05bc00762f86f0b07774b3c1838e7fdc96fc73fc25e179cf1e362c6a382c93f3a231ab9a7e346b5c6e0b3108ab942f0e1d6a94de6ad5ff78898bc6bfeff7d33439fbf857e9e92e3e950ac99493c85f9e46d2e861a84cc55024f2e3c922e0385c5657e349169a9b38ab1873775e79b5ce01f22c03d49711dab238a5dd377fa3d901da99fe2575fda2dc61155918e4f3134b2c82de65afc0051cf171fd90e0beb4efdaacfcb168f19407fd5e4ec4533c50036ebf65549a73d2485ab5f97648d49e928b003ccb1597b25033c3aa4b5955e4106078c4aba0b28f02a9e6251c16a2061c068e272cb0cf419fc9365e1d3431ec44343bc92dce89db80c90a367267c65218f0122bc74670b21fe825fd4e76dc8a59cc706cf64eecd646a040b7560250ac28ea22e7a5ec7966ec4600ba57c93db11a692c9b4312d81fd4c85ab0cc8363d60c90f8bd1a5930455622f3959a912523429b3aa169362af4c04dc2bf4a3a5b4e5c3bd2c26fe9cdb079dcfd244d88d228fc8933602b1a0a9ddeb20eef0ce588f4bb814390e27ae1bc585f6615104f67ca3291f01591e09cd003214b917b1d8c9e60fa4381477f466b70e7bcdc366237f440de55e7426e37bdeae9d5",
	REDIRECT_URI: "https://2983-5-166-235-163.eu.ngrok.io",
	SUB_DOMAIN: "techaccsber",
	// конфигурация сервера
	PORT: 2000,
}; 

module.exports = config;
