# SUNBOATS DF — V4 pronta para Render gratuito

## Status
Arquivos do site preparados e conferidos. **Este ZIP não significa que o site está publicado**; o Render precisa que os arquivos sejam enviados a um repositório Git novo e que um site estático seja criado.

## Proteção dos outros projetos
Use um repositório EXCLUSIVO (sugestão: `sunboats-df-v4`) e um serviço NOVO `sunboats-df-v4` no Render. Não use nem edite `vision-oticas` ou outros sites.

## Configuração no Render
1. Crie/autorize um repositório GitHub, GitLab ou Bitbucket apenas para Sunboats DF V4.
2. Publique **os arquivos EXTRAÍDOS deste ZIP na raiz** do repositório; o `index.html` deve estar na raiz, assim como `styles.css`, `script.js` e a pasta `assets`.
3. No Render > New > Static Site, conecte esse repositório.
4. Nome: `sunboats-df-v4` (ou outro nome disponível sem interferir nos serviços existentes).
5. Branch: `main` (se essa for a branch principal do repositório).
6. Build Command: `echo 'SUNBOATS V4 - site estatico pronto'`
7. Publish Directory: `.`
8. Ligue Auto Deploy se quiser publicação automática a cada commit.
9. Se o Render não aplicar o `render.yaml`, configure os cabeçalhos pelo painel ou manualmente a partir do arquivo.
10. Aguarde estado **Live** e verifique o endereço real `https://[nome-do-servico].onrender.com` exibido no Render. Não presuma que a URL está ativa antes de conferir.

## Configuração via Blueprint
O arquivo `render.yaml` também descreve um serviço estático isolado, mas ele só deve ser aplicado em um Blueprint NOVO/independente. NÃO sincronize esse arquivo com um Blueprint de outro projeto.

## Verificações e pendências
- O site não precisa de Node, banco de dados nem backend.
- O formulário apenas prepara uma mensagem e abre o WhatsApp; ele NÃO confirma reserva automaticamente.
- Fotos, WebP, MP4, SVG, CSS, HTML e JS foram preservados da V4 original.
- WhatsApp no projeto: +55 61 9628-5893. **Confirme que abre a conta correta** antes de campanhas.
- Confirmar preços, lotação, duração, ponto de embarque e autorizações de uso de imagem; não há promessas não verificadas.
- O plano gratuito do Render tem limites mensais de banda e de minutos de build; se houver método de pagamento cadastrado, podem ocorrer custos adicionais por uso excedente.

Documentação oficial: https://render.com/docs/static-sites
