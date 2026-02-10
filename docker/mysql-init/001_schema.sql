SET NAMES utf8mb4;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS interests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  label VARCHAR(120) NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS modules (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contact_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

  product VARCHAR(30) NOT NULL,
  form_type ENUM('demo','presentation') NOT NULL,

  name VARCHAR(120) NOT NULL,
  role VARCHAR(120) NULL,
  municipality VARCHAR(120) NULL,
  uf CHAR(2) NULL,
  email VARCHAR(190) NOT NULL,
  whatsapp VARCHAR(30) NULL,

  interest_id BIGINT UNSIGNED NULL,

  message TEXT NULL,
  observations TEXT NULL,

  page_url VARCHAR(500) NULL,
  utm_source VARCHAR(120) NULL,
  utm_medium VARCHAR(120) NULL,
  utm_campaign VARCHAR(120) NULL,
  utm_term VARCHAR(120) NULL,
  utm_content VARCHAR(120) NULL,

  ip VARCHAR(45) NULL,
  user_agent VARCHAR(500) NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_contact_interest
    FOREIGN KEY (interest_id) REFERENCES interests(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contact_request_modules (
  request_id BIGINT UNSIGNED NOT NULL,
  module_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (request_id, module_id),
  CONSTRAINT fk_crm_request
    FOREIGN KEY (request_id) REFERENCES contact_requests(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_crm_module
    FOREIGN KEY (module_id) REFERENCES modules(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed de módulos (do seu modal)
INSERT IGNORE INTO modules (code, name) VALUES
('transporte_escolar','Transporte Escolar'),
('alunos','Alunos'),
('merenda','Merenda'),
('diario_do_aluno','Diário do Aluno'),
('usuarios_permissoes','Usuários e Permissões'),
('escolas','Escolas'),
('professores','Professores'),
('pre_matricula_matricula','Pré-matrícula / Matrícula'),
('relatorios_indicadores','Relatórios & Indicadores');

-- Seed básico de interest (ajuste quando souber as opções do select)
INSERT IGNORE INTO interests (code, label, active) VALUES
('geral','Geral', 1);
