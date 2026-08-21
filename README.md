medHMMV — Módulo Médico e Clínico do HMMV ERP

O medHMMV é o módulo médico e clínico do HMMV ERP, responsável por concentrar o fluxo de atendimento médico, avaliação clínica, diagnóstico, prescrição e demais informações relacionadas à atuação médica.

O projeto faz parte de uma arquitetura modular composta por:

recepHMMV
enfHMMV
medHMMV
FarmHMMV
integra_SUS_HMMV

O objetivo não é criar sistemas independentes sem comunicação.

O objetivo é construir um ERP Hospitalar integrado, modular, orientado a workflow, auditável e preparado para interoperabilidade.


---

1. PAPEL DO MEDHMMV

Dentro do HMMV ERP, o medHMMV representa a camada médica/clínica.

Seu papel principal será conectar:

PACIENTE
   ↓
ATENDIMENTO
   ↓
AVALIAÇÃO MÉDICA
   ↓
DIAGNÓSTICO
   ↓
PRESCRIÇÃO
   ↓
FARMÁCIA
   ↓
ENFERMAGEM

O médico deve trabalhar dentro do contexto do atendimento hospitalar, e não em um sistema isolado.


---

2. ARQUITETURA DO ERP

Arquitetura conceitual:

HMMV ERP
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ↓                 ↓                 ↓
     recepHMMV          medHMMV           enfHMMV
          │                 │                 │
          │                 ↓                 │
          │            PRESCRIÇÃO             │
          │                 │                 │
          │                 ↓                 │
          │             FarmHMMV              │
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ↓
                    integra_SUS_HMMV
                            ↓
                          FHIR
                            ↓
                   ADAPTER GOVERNAMENTAL

O medHMMV não deverá possuir integração direta com RNDS.


---

3. ESTADO ATUAL

🟠 Base técnica inicial

O repositório atualmente representa uma base backend inicial para evolução do módulo médico.

A estrutura existente inclui elementos como:

Node.js;

backend;

Prisma;

estrutura de banco de dados;

package.json;

package-lock.json;

.env.example;

diretório src/.


O projeto ainda está em fase inicial de desenvolvimento.

Portanto, a existência de estruturas técnicas não significa que todas as funcionalidades clínicas descritas neste documento estejam implementadas.


---

4. O QUE ESTÁ IMPLEMENTADO

A base atual permite iniciar a construção do domínio médico através de:

backend;

estrutura de aplicação;

Prisma;

configuração de ambiente;

camada preparada para persistência de dados.


Esses componentes representam a fundação técnica do módulo.

A cobertura funcional clínica ainda está em evolução.


---

5. O QUE ESTÁ PARCIAL

O módulo ainda precisa consolidar:

domínio médico;

pacientes;

atendimentos;

consultas;

internações;

avaliação clínica;

diagnóstico;

prescrição;

medicamentos;

exames;

procedimentos;

evolução médica;

integração com enfermagem;

integração com farmácia;

auditoria;

permissões;

contratos internos;

testes;

validação clínica.



---

6. O QUE PRECISA SER CONSTRUÍDO

Paciente

O medHMMV deverá consumir a identidade do paciente proveniente do domínio central do ERP.

Dados relevantes:

identificador;

nome;

data de nascimento;

sexo;

documentos necessários;

contatos;

contexto do atendimento.


O cadastro mestre não deverá ser duplicado desnecessariamente.


---

7. ATENDIMENTO

O atendimento representa o contexto clínico no qual o médico atua.

Deverá possuir, conforme o domínio:

paciente;

profissional;

data/hora;

unidade;

setor;

tipo;

origem;

situação;

vínculo com internação;

histórico.


Modelo conceitual:

PATIENT
   ↓
ENCOUNTER
   ↓
PRACTITIONER
   ↓
MEDICAL RECORD


---

8. AVALIAÇÃO MÉDICA

O módulo deverá evoluir para permitir registros clínicos estruturados.

Possíveis componentes:

queixa principal;

história clínica;

antecedentes;

exame físico;

hipóteses diagnósticas;

diagnóstico;

conduta;

observações;

evolução.


Os campos definitivos deverão ser definidos conforme o workflow clínico adotado pelo hospital.


---

9. DIAGNÓSTICO

O domínio médico deverá permitir registrar diagnósticos associados ao atendimento.

A arquitetura deverá permitir futuramente trabalhar com terminologias e classificações padronizadas quando necessário.

O diagnóstico deverá possuir:

atendimento;

profissional;

classificação;

descrição;

situação;

data/hora;

observação;

auditoria.



---

10. PRESCRIÇÃO

A prescrição é uma das principais fronteiras entre medHMMV, FarmHMMV e enfHMMV.

Fluxo:

MEDHMMV
   ↓
PRESCRIÇÃO
   ↓
VALIDAÇÃO
   ↓
FarmHMMV
   ↓
DISPENSAÇÃO
   ↓
enfHMMV
   ↓
ADMINISTRAÇÃO

A prescrição deverá permitir representar, quando aplicável:

medicamento;

dose;

unidade;

via;

frequência;

horário;

duração;

quantidade;

observações;

profissional;

paciente;

atendimento;

status.



---

11. PRESCRIÇÃO NÃO DEVE CONTROLAR ESTOQUE

O medHMMV registra a intenção clínica.

O FarmHMMV é responsável pelo estoque.

Portanto:

MEDHMMV
   ↓
PRESCREVE
   ↓
FarmHMMV
   ↓
VALIDA ESTOQUE
   ↓
DISPENSA

O médico não deverá manipular diretamente o saldo do estoque.


---

12. INTEGRAÇÃO COM ENFHMMV

A prescrição deverá chegar à enfermagem por contrato interno.

medHMMV
   ↓
PRESCRIPTION
   ↓
CONTRATO INTERNO
   ↓
enfHMMV
   ↓
ADMINISTRAÇÃO
   ↓
REGISTRO

A enfermagem não deverá depender da implementação interna do backend médico.


---

13. INTEGRAÇÃO COM FARMHMMV

Fluxo:

PRESCRIÇÃO
     ↓
SOLICITAÇÃO
     ↓
FarmHMMV
     ↓
DISPENSAÇÃO
     ↓
REGISTRO

Responsabilidades:

medHMMV

prescrição;

alteração;

cancelamento;

contexto clínico.


FarmHMMV

estoque;

lote;

validade;

separação;

dispensação;

movimentação.


enfHMMV

administração;

registro assistencial.



---

14. INTEGRAÇÃO COM RECEPHMMV

Fluxo:

recepHMMV
    ↓
PACIENTE
    ↓
ATENDIMENTO
    ↓
medHMMV

O módulo médico deverá consumir o contexto necessário para executar o atendimento.

Não deverá duplicar desnecessariamente o cadastro mestre do paciente.


---

15. ENTIDADES DO DOMÍNIO

O domínio médico deverá evoluir em torno de entidades como:

PATIENT
ORGANIZATION
PRACTITIONER
PRACTITIONERROLE
ENCOUNTER
INTERNAÇÃO
MEDICALRECORD
OBSERVATION
CONDITION
DIAGNOSTICREPORT
PROCEDURE
PRESCRIPTION
MEDICATION
MEDICATIONREQUEST

Nem todas precisam ser implementadas imediatamente.

A evolução deverá ser incremental:

ENTIDADE
   ↓
MODELO
   ↓
VALIDAÇÃO
   ↓
SERVIÇO
   ↓
CONTRATO
   ↓
TESTE


---

16. EXAMES E PROCEDIMENTOS

O módulo deverá futuramente permitir integração com:

solicitações de exames;

resultados;

procedimentos;

laudos;

observações clínicas.


Fluxo conceitual:

MÉDICO
   ↓
SOLICITAÇÃO
   ↓
EXECUÇÃO
   ↓
RESULTADO
   ↓
REGISTRO CLÍNICO

A implementação deverá respeitar os limites de responsabilidade de cada módulo.


---

17. EVOLUÇÃO MÉDICA

O atendimento deverá possuir histórico clínico temporal.

Exemplo:

ATENDIMENTO
   ↓
EVOLUÇÃO 1
   ↓
EVOLUÇÃO 2
   ↓
EVOLUÇÃO 3
   ↓
ALTA / TRANSFERÊNCIA

Alterações relevantes devem possuir rastreabilidade.


---

18. AUDITORIA

Informações médicas exigem rastreabilidade.

Operações relevantes deverão registrar:

usuário;

profissional;

função;

data;

hora;

ação;

entidade;

identificador;

origem;

alteração realizada;

correlação da operação.


Registros clínicos críticos não devem ser apagados silenciosamente.


---

19. SEGURANÇA

Requisitos:

autenticação;

autorização;

RBAC;

segregação de funções;

menor privilégio;

validação de entrada;

proteção de credenciais;

auditoria;

logs;

tratamento seguro de erros;

controle de acesso aos dados;

secrets fora do código.



---

20. DADOS HOSPITALARES

O módulo poderá manipular informações clínicas e hospitalares.

Portanto:

dados devem ser acessados somente quando necessários;

permissões devem ser aplicadas por função;

logs não devem expor dados sensíveis desnecessariamente;

alterações relevantes devem ser rastreáveis;

credenciais nunca devem ser armazenadas no código;

ambientes devem ser separados.


A conformidade legal e regulatória deverá ser validada antes de qualquer declaração formal.


---

21. INTEROPERABILIDADE

O medHMMV não deverá integrar diretamente com a RNDS.

Arquitetura:

medHMMV
   ↓
CONTRATO INTERNO
   ↓
integra_SUS_HMMV
   ↓
MAPPER
   ↓
FHIR
   ↓
ADAPTER GOVERNAMENTAL
   ↓
RNDS / SERVIÇO EXTERNO

Responsabilidade do medHMMV:

produzir dados clínicos internos consistentes.

Responsabilidade do integra_SUS_HMMV:

transformar e transportar dados para sistemas externos.


---

22. FHIR

A possibilidade de interoperabilidade futura deverá considerar recursos FHIR compatíveis com o domínio.

Exemplos conceituais:

Patient
Practitioner
Organization
Encounter
Observation
Condition
DiagnosticReport
Procedure
MedicationRequest
MedicationDispense
MedicationAdministration

A escolha definitiva dos recursos deverá ocorrer durante a implementação do gateway e validação dos requisitos externos.


---

23. SAAS

O produto deverá evoluir para:

multi-tenant;

múltiplos estabelecimentos;

isolamento de dados;

usuários;

RBAC;

configuração por hospital;

backup;

recuperação;

observabilidade;

suporte;

implantação.


A arquitetura deverá evitar que uma organização tenha acesso aos dados de outra.


---

24. WORKFLOW HOSPITALAR

Workflow alvo:

PACIENTE
   ↓
RECEPÇÃO
   ↓
ATENDIMENTO
   ↓
MÉDICO
   ↓
AVALIAÇÃO
   ↓
DIAGNÓSTICO
   ↓
PRESCRIÇÃO
   ↓
FARMÁCIA
   ↓
DISPENSAÇÃO
   ↓
ENFERMAGEM
   ↓
ADMINISTRAÇÃO
   ↓
AUDITORIA
   ↓
INTEROPERABILIDADE

O medHMMV ocupa principalmente o núcleo clínico do fluxo.


---

25. CONTRATOS INTERNOS

Os módulos devem comunicar-se através de contratos.

Regra:

MÓDULO
   ↓
CONTRATO
   ↓
SERVIÇO
   ↓
OUTRO MÓDULO

Evitar:

medHMMV
   ↓
BANCO DO FarmHMMV

ou:

medHMMV
   ↓
RNDS

O acoplamento direto reduz a capacidade de evolução independente dos módulos.


---

26. DEFINIÇÃO DO MVP

Para o medHMMV participar do MVP integrado, deverá existir pelo menos:

Atendimento

paciente;

atendimento;

profissional;

contexto clínico.


Clínica

avaliação;

diagnóstico;

evolução;

observações.


Prescrição

criação;

alteração;

cancelamento;

itens;

dose;

via;

frequência;

status.


Integração

contrato com recepHMMV;

contrato com FarmHMMV;

contrato com enfHMMV;

eventos auditáveis.


Segurança

autenticação;

autorização;

RBAC;

auditoria.



---

27. CRITÉRIOS DE ACEITAÇÃO

O módulo será considerado integrado ao MVP quando:

1. o médico puder trabalhar dentro do contexto de um atendimento;


2. o paciente puder ser identificado por contrato;


3. registros clínicos puderem ser associados ao atendimento;


4. diagnósticos puderem ser registrados;


5. prescrições puderem ser criadas;


6. prescrições puderem ser encaminhadas à Farmácia;


7. prescrições puderem ser disponibilizadas à Enfermagem;


8. alterações críticas forem auditáveis;


9. permissões impedirem acesso indevido;


10. o módulo não depender diretamente da RNDS;


11. dados externos forem encaminhados através do integra_SUS_HMMV.




---

28. ROADMAP

Fase 1 — Fundação

organizar backend;

revisar Prisma;

revisar banco;

revisar configuração;

remover artefatos indevidos do Git;

estruturar testes;

consolidar documentação.


Fase 2 — Atendimento

paciente;

atendimento;

profissional;

internação;

setor;

leito.


Fase 3 — Clínica

avaliação;

diagnóstico;

evolução;

observações;

procedimentos.


Fase 4 — Prescrição

prescrição;

itens;

medicamentos;

validações;

cancelamento;

histórico.


Fase 5 — Integração

FarmHMMV;

enfHMMV;

recepHMMV;

contratos;

eventos;

auditoria.


Fase 6 — ERP

relatórios;

indicadores;

RBAC avançado;

multi-tenant;

observabilidade.


Fase 7 — Interoperabilidade

integra_SUS_HMMV;

mappers;

FHIR;

adapters;

homologação.



---

29. CORREÇÃO TÉCNICA DO REPOSITÓRIO

O repositório possui node_modules/ versionado.

Isso deve ser corrigido posteriormente.

Regra:

node_modules/
.env
logs/
build/
dist/

não devem ser versionados quando forem artefatos locais ou contendo informações sensíveis.

O .gitignore deverá ser revisado antes da evolução do backend.


---

30. DEFINIÇÃO DE PRONTO

Uma funcionalidade somente será considerada concluída quando:

estiver implementada;

estiver validada;

possuir tratamento de erros;

respeitar permissões;

possuir auditoria quando necessária;

possuir testes quando aplicável;

respeitar os contratos internos;

estiver documentada;

estiver integrada ao workflow correto.


Documentação não significa implementação.

Planejamento não significa funcionalidade existente.


---

31. GOVERNMENT READY

O objetivo futuro é que o HMMV ERP possua arquitetura preparada para requisitos governamentais.

Entretanto, o medHMMV não declara conformidade governamental.

Qualquer declaração futura dependerá da validação efetiva de:

requisitos técnicos;

segurança;

proteção de dados;

infraestrutura;

documentação;

contratos;

integrações;

homologações;

requisitos específicos do órgão comprador.



---

32. POSIÇÃO DO PROJETO

Status: 🟠 BASE TÉCNICA / DESENVOLVIMENTO INICIAL

O medHMMV possui uma fundação backend sobre a qual será construído o módulo médico/clínico do HMMV ERP.

O objetivo não é apenas criar um prontuário médico.

O objetivo é construir o núcleo clínico de um ERP Hospitalar integrado, conectado ao fluxo completo do hospital.

RECEPÇÃO
    ↓
ATENDIMENTO
    ↓
MEDHMMV
    ↓
PRESCRIÇÃO
    ↓
FARMHMMV
    ↓
ENFHMMV
    ↓
ADMINISTRAÇÃO
    ↓
AUDITORIA
    ↓
INTEGRAÇÃO

HMMV ERP — ERP Hospitalar Modular, Integrado e Orientado a Workflow.

Status: DESENVOLVIMENTO ATIVO Objetivo: MVP SaaS ERP Hospitalar HMMV — arquitetura modular, workflow hospitalar ponta a ponta, segurança, auditoria e interoperabilidade.
