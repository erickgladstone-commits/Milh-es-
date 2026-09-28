# Réplica local de Stalkea

Réplica estática da página de referência `https://stalkeia.ai/`, criada em HTML, CSS e JavaScript sem dependências de framework.

## Executar

A partir desta pasta:

```bash
python3 -m http.server 4173
```

Abra `http://127.0.0.1:4173`.

## Configuração

Edite `CONFIG` em `script.js` para alterar `CHECKOUT_URL`, nome do produto, preços, imagens, vídeos e cores. O checkout foi deixado vazio porque nenhum novo URL foi fornecido no arquivo de instruções; nesse estado o CTA mostra uma mensagem e não redireciona.
