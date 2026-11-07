# Reunião editorial simulada — Sunboats V4

## Mesa 1: Marketing e conversão
**Decisão**: manter reserva direta pelo WhatsApp na capa e disponibilizar formulário de consulta para quem precisa informar data e grupo. Acrescentar vídeo como prova visual logo no primeiro bloco. Evitar preços e promessas não confirmados.

**Risco monitorado**: o número de WhatsApp enviado aparece com 8 dígitos depois do DDD. Foi preservado exatamente como recebido; precisa de confirmação antes de impulsionar campanhas.

## Mesa 2: Direção de arte e audiovisual
**Decisão**: corrigir o recorte da fotografia de capa em desktops para que a lancha não fique fora do enquadramento; usar enquadramento distinto no mobile. Manter a correção cinematográfica sutil do filme de sete cortes, com cores do lago naturais e sem inventar cenas.

**Risco monitorado**: textos de redes sociais incorporados às imagens só podem ser removidos de forma perfeita com os originais limpos. Nenhuma tentativa de fingir ou alterar embarcações.

## Mesa 3: Desenvolvimento e UX
**Decisão**: player único com escolha entre três vídeos; galeria com zoom acessível; CTA móvel com texto legível; cache curto para mídias enquanto o site ainda está em revisão. Sem backend nem banco de dados, portanto não armazena dados do formulário.

**Critérios de verificação**: 390px e 1440px; sem console JS errors, elementos dentro da viewport, seleção do player, inputs do formulário e abertura/fechamento da galeria. Ainda faltam testes de dispositivo real e serviço WhatsApp.
