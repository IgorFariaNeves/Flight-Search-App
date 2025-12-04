O aplicativo Flight Search App é uma ferramenta móvel desenvolvida em React Native projetada para facilitar a consulta de informações sobre voos, aeroportos e companhias aéreas em tempo real.

Aqui está uma explicação detalhada do seu funcionamento:

1. Funcionalidade Principal: Busca de Voos
A principal característica do aplicativo é a capacidade de rastrear voos.

Como funciona: O usuário insere o número do voo (código IATA, ex: "AA100") na tela de busca.
Dados Exibidos: O app consulta a API da AviationStack e retorna detalhes cruciais, incluindo:
Aeroportos de Origem e Destino.
Horários de Partida e Chegada (Programados).
Status do voo (traduzido para português: "Agendado", "Em voo", "Aterrissou", etc.).
Informações de portão (Gate) e terminal.
2. Estrutura de Navegação
O aplicativo utiliza uma navegação híbrida e robusta para garantir uma boa experiência de usuário:

Abas Inferiores (Tab Navigator): Permitem acesso rápido às seções mais usadas:
Buscar: Tela inicial para realizar pesquisas.
Histórico: Para rever buscas anteriores.
Favoritos: Para acessar voos salvos.
Configurações: Ajustes do aplicativo.
Menu Lateral (Drawer Menu): Acessível via ícone no topo esquerdo, oferece opções adicionais de exploração:
Aeroportos: Funcionalidade dedicada à busca de informações sobre aeroportos.
Companhias Aéreas: Funcionalidade para buscar dados de operadoras aéreas.
3. Integração Técnica
O aplicativo não utiliza apenas dados simulados; ele está integrado a serviços reais:

API AviationStack: É o motor por trás dos dados. O arquivo 

api.js
 gerencia as requisições para buscar detalhes de voos, aeroportos e companhias aéreas.
Tratamento de Erros: O sistema está preparado para lidar com falhas de comunicação ou voos não encontrados, informando o usuário adequadamente.
Resumo
Em suma, o App funciona como um assistente de viagem pessoal, centralizando informações de tráfego aéreo em uma interface limpa e organizada, permitindo que o usuário acompanhe voos e explore dados da aviação civil de forma prática e rápida.
