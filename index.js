// alvo: https://www.situacao-cadastral.com/
// objetivo: tirar print do resultado da consulta

const puppeteer = require("puppeteer");
let cpfConsultado = "986.108.960-80"; // cpf gerado na api 4devs
let cpfs = ["986.108.960-80", "626.974.070-30"]; // cpf gerado na api 4devs

const consultaCpf = async cpfs => {
  for (let i = 0; i < cpfs.length; i++) {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    await page.goto("https://www.situacao-cadastral.com/");

    await page.waitFor('input[name="doc"]');
    await page.type('input[name="doc"]', cpfs[i], { delay: 180 });
    await page.keyboard.press("Enter");
    await page.waitFor("#corpo > tbody > tr:nth-child(2) > td > span > a");
    await page.screenshot({ path: `images/consultaCPF-${cpfs[i]}.png` });
    await browser.close();
  }
};

consultaCpf(cpfs);
