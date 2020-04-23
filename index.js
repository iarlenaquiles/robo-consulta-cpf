// alvo: https://www.situacao-cadastral.com/
// objetivo: tirar print do resultado da consulta

const puppeteer = require("puppeteer");
let cpfConsultado = "986.108.960-80"; // cpf gerado na api 4devs

const consultaCpf = async cpf => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.goto("https://www.situacao-cadastral.com/");

  await page.waitFor('input[name="doc"]');
  await page.type('input[name="doc"]', cpf, { delay: 180 });
  await page.keyboard.press("Enter");
  await page.waitFor("#corpo > tbody > tr:nth-child(2) > td > span > a");
  await page.screenshot({ path: `images/consultaCPF-${cpf}.png` });

  await browser.close();
};

consultaCpf(cpfConsultado);
