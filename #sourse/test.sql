-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 15 2020 г., 00:45
-- Версия сервера: 10.3.13-MariaDB-log
-- Версия PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shop_item`
--

-- --------------------------------------------------------

--
-- Структура таблицы `color_value`
--

CREATE TABLE `color_value` (
  `id` int(11) NOT NULL,
  `name` char(64) NOT NULL,
  `red` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `green` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `blue` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `rgb` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `color_value`
--

INSERT INTO `color_value` (`id`, `name`, `red`, `green`, `blue`, `rgb`) VALUES
(1, 'beige', 245, 245, 220, '#f5f5dc'),
(2, 'black', 0, 0, 0, '#000000'),
(3, 'blue', 0, 0, 255, '#0000ff'),
(4, 'brown', 165, 42, 42, '#a52a2a'),
(5, 'burez', 3, 252, 202, '#03fcca'),
(6, 'gold', 255, 215, 0, '#ffd700'),
(7, 'green', 0, 255, 0, '#00ff00'),
(8, 'grey', 168, 168, 168, '#a8a8a8'),
(9, 'orange', 255, 165, 0, '#ffa500'),
(10, 'pink', 240, 10, 221, '#f00add'),
(11, 'red', 255, 0, 0, '#ff0000'),
(12, 'white', 255, 255, 255, '#ffffff'),
(13, 'yellow', 255, 255, 0, '#ffff00');

-- --------------------------------------------------------

--
-- Структура таблицы `item`
--

CREATE TABLE `item` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` tinytext NOT NULL,
  `gender` tinytext NOT NULL,
  `kids` tinyint(1) NOT NULL DEFAULT 0,
  `size` text NOT NULL,
  `cost` float UNSIGNED NOT NULL,
  `description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `item`
--

INSERT INTO `item` (`id`, `name`, `gender`, `kids`, `size`, `cost`, `description`) VALUES
(1, 'Майка, на которую вы сейчас смотрите', 'men', 0, 'XXL,XX,X,L', 1000.5, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(12, 'Штаны Frorclaz', 'men', 0, 'X,L', 2250.55, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(13, 'Рюкзак', 'men', 0, '10 литров', 4500, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(14, 'Куртка', 'women', 0, 'XL,X,L', 4500, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(15, 'Походная обувь', 'women', 0, '37,38,39,40', 6000, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(16, 'Футболка', 'women', 0, 'XL,X,L', 1500, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(17, 'Из Китая', 'women', 0, 'x,M,L', 6500.5, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(18, 'НогаМячка', 'men', 0, 'XL,X,ML,M,L', 1499.99, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(20, 'Куртка с капюшоном', 'women', 1, 'M,L', 2300, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(21, 'Штаны на подтяжках', 'women', 1, 'M,L', 2300, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(22, 'Толстовка', 'men', 1, 'M,L', 1400, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(23, 'тослтовка с капюшоном', 'men', 1, 'M,L', 2300, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(24, 'майка', 'men', 1, 'M,L', 800, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(25, 'майка', 'men', 1, 'M,L', 800, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(26, 'майка', 'men', 1, 'M,L', 500, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(27, 'Боксёрская накидка', 'men', 1, 'M,L', 1600, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(28, 'Скафандер', 'women', 1, 'M,L', 2500, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(29, 'Платье', 'women', 1, 'M,L', 1400, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.'),
(30, 'Платье', 'women', 1, 'M,L', 2000, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur libero a dicta consequuntur, cum iste molestias nulla eligendi corrupti aliquam et tempore suscipit debitis inventore, voluptates non autem ea nemo.');

-- --------------------------------------------------------

--
-- Структура таблицы `item_img`
--

CREATE TABLE `item_img` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `id_img` smallint(5) UNSIGNED NOT NULL,
  `url_img` text NOT NULL,
  `color_img` char(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `item_img`
--

INSERT INTO `item_img` (`id`, `id_img`, `url_img`, `color_img`) VALUES
(7, 1, 'Style\\Image\\item\\img1.png,Style\\Image\\item\\img2.png', 'black'),
(8, 12, 'Style\\Image\\item\\img2.png', 'brown'),
(9, 13, 'Style\\Image\\item\\img3.png', NULL),
(19, 14, 'Style\\Image\\item\\img4.png', 'blue'),
(20, 15, 'Style\\Image\\item\\img5.png', 'blue'),
(21, 16, 'Style\\Image\\item\\img6.png', 'blue'),
(22, 17, 'Style\\Image\\item\\women-1.png', 'black'),
(23, 17, 'Style\\Image\\item\\women-2.png', 'red'),
(24, 17, 'Style\\Image\\item\\women-3.png', 'blue'),
(25, 18, 'Style\\Image\\item\\men-1.jpg', 'grey'),
(26, 18, 'Style\\Image\\item\\men-2.jpg', 'red'),
(27, 18, 'Style\\Image\\item\\men-3.jpg', 'pink'),
(28, 20, 'Style\\Image\\item\\kids\\img1.png', 'pink'),
(29, 21, 'Style\\Image\\item\\kids\\img2.png', 'yellow'),
(30, 22, 'Style\\Image\\item\\kids\\img3.png', 'black'),
(31, 23, 'Style\\Image\\item\\kids\\img4.png', 'green'),
(32, 24, 'Style\\Image\\item\\kids\\img5.png', 'red'),
(33, 25, 'Style\\Image\\item\\kids\\img6.png', 'grey'),
(34, 26, 'Style\\Image\\item\\kids\\img7.png', 'blue'),
(35, 26, 'Style\\Image\\item\\kids\\img8.png', 'orange'),
(36, 27, 'Style\\Image\\item\\kids\\img9.png', 'blue'),
(37, 28, 'Style\\Image\\item\\kids\\img10.png', 'blue'),
(38, 29, 'Style\\Image\\item\\kids\\img11.png', 'pink'),
(39, 30, 'Style\\Image\\item\\kids\\img12.png', 'blue');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `color_value`
--
ALTER TABLE `color_value`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `item_img`
--
ALTER TABLE `item_img`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_img` (`id_img`),
  ADD KEY `color_img` (`color_img`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `color_value`
--
ALTER TABLE `color_value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `item`
--
ALTER TABLE `item`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `item_img`
--
ALTER TABLE `item_img`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `item_img`
--
ALTER TABLE `item_img`
  ADD CONSTRAINT `item_img_ibfk_2` FOREIGN KEY (`color_img`) REFERENCES `color_value` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_img_ibfk_3` FOREIGN KEY (`id_img`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
