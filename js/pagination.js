function addSlot(slot_info, gender = "men,women", all) {
	let men = [];
	let women = [];
	// функции добавления слотов для мущин и для женжин, а также пагинации
	function men_slot(men, up = 0) {
		uplevel = document.querySelectorAll('div.slot');
		let slot = document.querySelector("div.slot-item-hidden");
		for (let i = 0; i < men.length; i++) {
			let clone = slot.cloneNode(true);
			clone.className = "slot_item";
			// Вставляем инфу о размерах
			let size = men[i].size.split(',');
			let clone_el = clone.querySelector("select.size__item");
			let el; // редактируемый элемент
			for (var j = 0; j < size.length; j++) {
				el = document.createElement('option');
				el.value = size[j];
				el.text = String((size[j]));
				clone_el.appendChild(el);
				if (size[j].length >= 8) {
					clone_el = clone.querySelector(".select");
					let arrow = clone_el.querySelector('span.arrow');
					arrow.style = "right: -8px";
				}
			}
			// цвет товара
			clone_el = clone.querySelector("div.color-item");
			el = document.createElement('ul');
			el.className = "color_item__slot";
			for (let j = 0; j < men[i].color.length && j < 3; j++) {
				let el_addition = document.createElement('li');
				el_addition.className = "slot_" + (j + 1);
				el_addition.style.background = men[i].color[j].rgb;
				let link = document.createElement("a");
				link.className = "color-link";
				if (men[i].img[j] != null) {
					link.href = men[i].img[j];
				} else { link.href = "#"; }
				el_addition.appendChild(link);
				el.appendChild(el_addition);
				el_addition = document.createElement('span');
				el_addition.className = "spase_li";
				el.appendChild(el_addition);
			}
			clone_el.appendChild(el);
			// вставляем картинку товара
			clone_el = clone.querySelector("div.item__image");
			el = document.createElement('img');
			el.src = men[i].img[0];
			clone_el.appendChild(el);
			// вставляем имя товара
			clone_el = clone.querySelector("div.name__item");
			clone_el.textContent = men[i].name;
			// вставляем цену товара
			clone_el = clone.querySelector('div.cost__item');
			el = document.createElement('span');
			el.textContent = '₽';
			clone_el.textContent = men[i].cost[0] + ',' + men[i].cost[1];
			clone_el.appendChild(el);
			uplevel[up].appendChild(clone);
		}
	}
	function women_slot(women, up = 1) {
		uplevel = document.querySelectorAll('div.slot');
		let slot = document.querySelector("div.slot-item-hidden");
		for (let i = 0; i < women.length; i++) {
			let clone = slot.cloneNode(true);
			clone.className = "slot_item";
			// Вставляем инфу о размерах
			let size = women[i].size.split(',');
			let clone_el = clone.querySelector("select.size__item");
			let el;
			for (var j = 0; j < size.length; j++) {
				el = document.createElement('option');
				el.value = size[j];
				el.text = String((size[j]));
				clone_el.appendChild(el);
				if (size[j].length >= 8) {
					clone_el = clone.querySelector(".select");
					let arrow = clone_el.querySelector('span.arrow');
					arrow.style = "right: -8px";
				}
			}
			// цвет товара
			clone_el = clone.querySelector("div.color-item");
			el = document.createElement('ul');
			el.className = "color_item__slot";
			for (let j = 0; j < women[i].color.length && j < 3; j++) {
				let el_addition = document.createElement('li');
				el_addition.className = "slot_" + (j + 1);
				el_addition.style.background = women[i].color[j].rgb;
				let link = document.createElement("a");
				link.className = "color-link";
				if (women[i].img[j] != null) {
					link.href = women[i].img[j];
				} else { link.href = "#"; }
				el_addition.appendChild(link);
				el.appendChild(el_addition);
				el_addition = document.createElement('span');
				el_addition.className = "spase_li";
				el.appendChild(el_addition);
			}
			clone_el.appendChild(el);
			// вставляем картинку товара
			clone_el = clone.querySelector("div.item__image");
			el = document.createElement('img');
			el.src = women[i].img[0];
			clone_el.appendChild(el);
			// вставляем имя товара
			clone_el = clone.querySelector("div.name__item");
			clone_el.textContent = women[i].name;
			// вставляем цену товара
			clone_el = clone.querySelector('div.cost__item');
			el = document.createElement('span');
			el.textContent = '₽';
			clone_el.textContent = women[i].cost[0] + ',' + women[i].cost[1];
			clone_el.appendChild(el);
			uplevel[up].appendChild(clone);
		}
	}
	// сортеруем по полу
	slot_info.forEach(el => {
		if (el.gender == 'men') { men.push(el) }
		else if (el.gender == 'women') { women.push(el) }
	});
	// подготовка к запуску функций
	let gen = gender.split(',');
	// запуск
	let mess = document.querySelectorAll('div.message_slot');
	gen.forEach(g => {
		//мужской отдел
		if (g == "men" && slot_info.length != 0) {
			if (men.length != 0) {
				if (mess.length > 0) {
					mess.forEach(m => { if (m.dataset.gender == 'men') m.parentElement.removeChild(m); });
				}
				if (!all) men_slot(men);
				else men_slot(men, 2);

			}
			else if (slot_info[(slot_info.length - 1)].pagination.men == undefined) {
				message = document.createElement('div');
				message.className = 'message_slot';
				message.dataset.gender = "men";
				message.textContent = "Товар не найден";
				uplevel[0].appendChild(message);
				uplevel[0].className = "slot_message";
			}
		}
		//женский отдел
		if (g == "women" && slot_info.length != 0) {
			if (women.length != 0) {
				if (mess.length > 0) {
					mess.forEach(m => { if (m.dataset.gender == 'women') m.parentElement.removeChild(m); });
				}
				if (!all) women_slot(women);
				else women_slot(women, 2);
			}
			else if (slot_info[(slot_info.length - 1)].pagination.women == undefined) {
				message = document.createElement('div');
				message.className = 'message_slot';
				message.dataset.gender = "women";
				message.textContent = "Товар не найден";
				uplevel[1].appendChild(message);
				uplevel[1].className = "slot_message";
			}
		}
	});
	// запуск скрипта смены изображения
	go();
}
function ajax_conect(gender = "men,women", start = 0, get = 3, kids = 0, all = false) {
	let slot = new XMLHttpRequest();
	slot.open('GET', '../Component/prepare_item.php?gender=' + gender + '&start=' + start + '&get=' + get + '&kids=' + kids, true);
	json = slot.addEventListener('readystatechange', function () {
		if (slot.readyState == 4 && slot.status == 200) {
			let respons = JSON.parse(slot.responseText);
			addSlot(respons, gender, all);
		}
	})
	slot.send();
}
