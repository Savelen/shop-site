let slot_data = {
	data: [],
	bayList: new Map(),
	check: [],
	ajax_conect: function (gender = "men,women", start = 0, get = 3, kids = 0, all = false) {
		let data_slot = new XMLHttpRequest();
		data_slot.open('GET', '../Component/prepare_item.php?gender=' + gender + '&start=' + start + '&get=' + get + '&kids=' + kids, true);
		data_slot.addEventListener('readystatechange', () => {
			if (data_slot.readyState == 4 && data_slot.status == 200) {
				let respons = JSON.parse(data_slot.responseText);
				this.genSlot(respons, gender, all);
			}
		});
		data_slot.send();
	},
	ajax_get_id: function (id) {
		let item = new XMLHttpRequest();
		item.open("GET", "../Component/prepare_item.php?id=" + id, false);
		item.addEventListener("readystatechange", () => {
			if (item.readyState == 4 && item.status == 200) {
				let respons = JSON.parse(item.responseText);
				slot_data.data = respons[0];
			}
		});
		item.send();
	},
	genSlot: function (slot_info, gender = "men,women", all) {
		let men = [];
		let women = [];
		// функции добавления слотов для мущин и для женжин, а также пагинации
		function gen_slot(data, up) {
			uplevel = document.querySelectorAll('.slot');
			let slot = document.querySelector(".slot-item_hidden");
			for (let i = 0; i < data.length; i++) {
				let clone = slot.cloneNode(true);
				clone.className = "slot-item slot-item_show";
				clone.dataset.id = data[i].id;
				// Вставляем инфу о размерах
				let size = data[i].size.split(',');
				let clone_el = clone.querySelector(".select-size__size-item");
				let el;
				for (var j = 0; j < size.length; j++) {
					el = document.createElement('option');
					el.value = size[j];
					el.text = String((size[j]));
					clone_el.appendChild(el);
				}
				// цвет товара
				clone_el = clone.querySelector(".color-item");
				el = document.createElement('ul');
				el.className = "color-item__list";
				for (let j = 0; j < data[i].color.length && j < 3; j++) {
					let el_addition = document.createElement('li');
					el_addition.className = "color-item__color";
					el_addition.style.background = data[i].color[j].rgb;
					let link = document.createElement("a");
					link.className = "color-link";
					link.dataset.id = j;
					if (data[i].img[j][0] != "") {
						link.href = data[i].img[j][0];
					} else { link.href = "#"; }
					el_addition.appendChild(link);
					el.appendChild(el_addition);
				}
				clone_el.appendChild(el);
				// вставляем картинку товара
				clone_el = clone.querySelector(".slot-item__image");
				el = document.createElement('img');
				el.src = data[i].img[0][0];
				clone_el.appendChild(el);
				// вставляем имя товара
				clone_el = clone.querySelector(".slot-item__name");
				if (data[i].name.length > 35) {
					let fontSize = 630 / data[i].name.length
					clone_el.style = " font-size: " + fontSize + "px;";
				}
				clone_el.textContent = data[i].name;
				// вставляем цену товара
				clone_el = clone.querySelector('.slot-item__cost');
				el = document.createElement('span');
				el.textContent = '₽';
				clone_el.textContent = data[i].cost[0] + ',' + data[i].cost[1];
				clone_el.appendChild(el);
				uplevel[up].appendChild(clone);
			}
			slot_data.bay_item(uplevel[up]);
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
					if (men.length <= 2) {
						document.querySelector('.men__slot').style = "justify-content: space-around;";
					}
					else {
						document.querySelector('.men__slot').style = "justify-content: space-between;";
					}
					if (mess.length > 0) {
						mess.forEach(m => { if (m.dataset.gender == 'men') m.parentElement.removeChild(m); });
					}
					if (!all) gen_slot(men, 0);
					else gen_slot(men, 2);

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
					if (women.length <= 2) {
						document.querySelector('.women__slot').style = "justify-content: space-around;";
					}
					else {
						document.querySelector('.women__slot').style = "justify-content: space-between;";
					}
					if (mess.length > 0) {
						mess.forEach(m => { if (m.dataset.gender == 'women') m.parentElement.removeChild(m); });
					}
					if (!all) gen_slot(women, 1);
					else gen_slot(women, 2);
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
		this.animationChange();
	},
	bay_item: function (section) {
		let bayitem = section.querySelectorAll('.slot-item__bay-button');
		bayitem.forEach(b => {
			b.addEventListener("click", () => {
				document.querySelector('body').style.overflow = 'hidden';
				document.querySelector('.shopping-card').style.display = "flex";
				document.querySelector('.select-box').style.display = "block";
				slot_data.ajax_get_id(b.parentElement.parentElement.parentElement.dataset.id);
				this.fill_out_select(
					b.parentElement.parentElement.parentElement.querySelector('.select-size__size-item').selectedIndex,
					b.parentElement.parentElement.querySelector('img').dataset.id
				);
			});
		});
	},
	fill_out_select: function (size = 1, color = 0) {
		let select = document.querySelector('.select-box__item-data');
		select.querySelector(".name__header").textContent = this.data.name;
		let arr = this.data.size.split(",");
		arr.forEach(s => {
			let el = document.createElement("li");
			el.className = "list-size__item";
			el.textContent = s;
			select.querySelector(".size__list-size").appendChild(el);
		});
		this.data.color.forEach(s => {
			let el = document.createElement("li");
			el.className = "color-item__item";
			el.dataset.id = s.id;
			el.style.backgroundColor = s.rgb;
			select.querySelector(".color__color-item").appendChild(el);
		});
		select.querySelector(".description__text").textContent = this.data.description;
		select.querySelector(".item-data__cost")
			.textContent = this.data.cost[0] + "," + this.data.cost[1] + "₽";
		this.gallery_start();
		this.getDataSelect(size, color);
	},
	fill_out_card: function () {
		this.count = 0;
		this.sum = 0;
		let parent = document.querySelector('.window-bay__box-el');
		let el = document.querySelector('.window-bay__contain-el_hidden');
		this.bayList.forEach((val) => {
			for (const key in val) {
				if (val.hasOwnProperty(key)) {
					let clone = el.cloneNode(true);
					clone.className = 'window-bay__contain-el window-bay__contain-el_show';
					clone.dataset.id = JSON.stringify({ "id": [val[key].id, key] });
					clone.querySelector('.bay-el__img').src = val[key].img[0][0];
					clone.querySelector('.bay-el__cost').textContent = val[key].cost[0] + ',' + val[key].cost[1] + '₽';
					clone.querySelector('.bay-el__quantity').textContent = '(' + val[key].quantity + ' Шт.' + ')';
					this.count += val[key].quantity;
					this.sum += Number(val[key].cost[0] + '.' + val[key].cost[1]) * val[key].quantity;
					clone.querySelector('.bay-el__name').textContent = val[key].name;
					clone.querySelector('.bay-el__size').textContent = val[key].size;
					clone.querySelector('.bay-el__color').style.background = val[key].color.rgb;
					parent.appendChild(clone);
				}
			}
		});
		parent = document.querySelector('.bay-box__total');
		parent.querySelector('.total__quantity').textContent = this.count;
		parent.querySelector(".total__sum").textContent = String(this.sum.toFixed(2)).replace('.', ',');
	},
	remove_content_select() {
		let select = document.querySelector('.select-box');
		select.querySelectorAll("li").forEach(r => {
			r.parentElement.removeChild(r);
		});
		select.querySelectorAll("img").forEach(r => {
			r.src = "#";
		});
		select.querySelector(".name__header").textContent = "";
		select.querySelector(".description__text").textContent = "";
		select.querySelector(".item-data__cost").textContent = "";
		document.querySelectorAll('.window-bay__contain-el_show').forEach(el => {
			el.parentElement.removeChild(el);
		});
		this.data = [];
	},
	add_events: function (fun) {
		slot_data.check.forEach(inp => {
			inp.addEventListener('click', fun);
		});
	},
	remove_events: function (fun) {
		slot_data.check.forEach(inp => {
			inp.removeEventListener('click', fun);
		});
	},
	show_slot: function () {
		let slot = document.querySelector('.item-filter__checkbox-item').querySelectorAll('input');
		let but = document.querySelector('.button-item__all-item');
		let activ = {
			'but': but.dataset.activ,
			'checkEnable': [],
			'checkDusable': []
		}
		slot.forEach(s => {
			if (s.checked && s.name != 'kids') activ.checkEnable.push(s);
			else if (!s.checked && s.name != 'kids') activ.checkDusable.push(s);
		});
		if (activ.but == 0 && activ.checkEnable.length != 0) {
			document.querySelector('.catalog-item').style.display = "block";
			document.querySelector('.catalog-item__all-item').style.display = "none";
			activ.checkEnable.forEach(c => document.querySelector('div.' + c.name).style.display = "block");
			activ.checkDusable.forEach(c => document.querySelector('div.' + c.name).style.display = "none");
		}
		else if (activ.but == 1 && activ.checkEnable.length != 0) {
			document.querySelector('.catalog-item').style.display = "block";
			document.querySelector('.catalog-item__all-item').style.display = "block";
			activ.checkEnable.forEach(c => document.querySelector('div.' + c.name).style.display = "none");
			activ.checkDusable.forEach(c => document.querySelector('div.' + c.name).style.display = "none");
		}
		else if (activ.checkEnable.length == 0) {
			document.querySelector('.catalog-item').style.display = "none";
			document.querySelector('.catalog-item__all-item').style.display = "none";
			activ.checkDusable.forEach(c => document.querySelector('div.' + c.name).style.display = "none");
		}
	},
	add_slot: function () {
		slot_data.show_slot();
		if (this.checked && this.name != "kids") {
			// проверяем активен ли cheackbox kids если да, то меняем генерацию
			let kid = document.querySelector("label.checkbox-item__label_kids").querySelector("input");
			if (!kid.checked) {
				let rem = document.querySelector('div.' + this.name).querySelectorAll('div.slot-item');
				rem.forEach(r => r.parentElement.removeChild(r));
				slot_data.ajax_conect(this.name);
				count_list(0, 'u');
			}
			if (kid.checked) {
				let rem = document.querySelector('div.' + this.name).querySelectorAll('div.slot-item');
				rem.forEach(r => r.parentElement.removeChild(r));
				slot_data.ajax_conect(this.name, 0, 3, 1);
				count_list(0, 'u', 1);
			}
		}
		else if (this.name == "kids") {
			if (this.checked) {
				// говорим показывать детскую одежду
				let kid = document.querySelectorAll('div.pagination');
				kid.forEach(k => {
					let a = k.querySelectorAll('span.pagination__arrow');
					a[0].dataset.start = 0;
					a[1].dataset.start = 3;
				});
				// выдаём детскую
				if (slot_data.check[0].checked) {
					// удаляем взрослую одежду
					let rem = document.querySelector("div.men__slot").querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					slot_data.ajax_conect("men", 0, 3, 1);
					count_list(0, 'men', 1);
				}
				if (slot_data.check[1].checked) {
					// удаляем взрослую одежду
					let rem = document.querySelector("div.women__slot").querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					slot_data.ajax_conect("women", 0, 3, 1);
					count_list(0, 'women', 1);
				}
			}
			else {
				// готовим показывать взрослую одежду
				let kid = document.querySelectorAll('div.pagination');
				kid.forEach(k => {
					let a = k.querySelectorAll('span.pagination__arrow');
					a[0].dataset.start = 0;
					a[1].dataset.start = 3;
				});
				// удаляем детскую одежду
				let rem = document.querySelectorAll('div.slot-item');
				rem.forEach(r => r.parentElement.removeChild(r));
				// генерируем взрослую
				if (slot_data.check[0].checked) {
					// удаляем детскую одежду
					slot_data.ajax_conect("men");
					count_list(0, 'u');
				}
				if (slot_data.check[1].checked) {
					// удаляем детскую одежду
					slot_data.ajax_conect("women");
					count_list(0, 'u');
				}

			}
		}
	},
	all_slot: function () {
		slot_data.show_slot();
		slot_data.check.forEach(inp => {
			if (this != inp && inp.name != 'kids' && this.name != 'kids') {
				inp.checked = false;
			}
		});
		if (this.checked && this.name != "kids") {
			// проверяем активен ли cheackbox kids если да, то меняем генерацию
			let kid = document.querySelector("label.checkbox-item__label_kids").querySelector("input");
			if (!kid.checked) {
				let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
				rem.forEach(r => r.parentElement.removeChild(r));
				slot_data.ajax_conect(this.name, 0, 100, 0, true);
			}
			if (kid.checked) {
				let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
				rem.forEach(r => r.parentElement.removeChild(r));
				slot_data.ajax_conect(this.name, 0, 100, 1, true);
			}
		}
		else if (this.name == "kids") {
			if (this.checked) {
				// выдаём детскую
				if (slot_data.check[0].checked) {
					// удаляем взрослую одежду
					let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					slot_data.ajax_conect('men', 0, 100, 1, true);
				}
				if (slot_data.check[1].checked) {
					// удаляем взрослую одежду
					let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					slot_data.ajax_conect("women", 0, 100, 1, true);
				}
			}
			else {
				// генерируем взрослую
				if (slot_data.check[0].checked) {
					// удаляем детскую одежду
					let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					slot_data.ajax_conect('men', 0, 100, 0, true);
				}
				if (slot_data.check[1].checked) {
					// удаляем детскую одежду
					let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					slot_data.ajax_conect("women", 0, 100, 0, true);
				}
			}
		}

	},
	checked_box: function (all) {
		if (!all) {
			slot_data.check.forEach(inp => {
				if (inp.checked && inp.name != "kids") {
					slot_data.add_slot.call(inp);
				}
			});
		}
		else {
			slot_data.check.forEach(inp => {
				if (inp.checked && inp.name != "kids") {
					slot_data.all_slot.call(inp);
				}
			});
		}
	},
	animationChange: function () {
		let img_arr = document.querySelectorAll('li');
		img_arr.forEach(link => {
			link.addEventListener("click", () => {
				let img = link.querySelector('a');
				let up_elem = (iterac = 3) => {
					let parent_el = link.parentElement;
					for (i = 0; i < iterac; i++) {
						parent_el = parent_el.parentElement;
					}
					return parent_el;
				}
				let old_img = up_elem().querySelector('img');
				old_img.dataset.id = img.dataset.id;
				old_img.addEventListener("animationend", () => {
					old_img.style.animationName = '';
				});
				old_img.style = "animation: hidden 0.4s linear 1 forwards";
				setTimeout(() => {
					old_img.src = img.href;
				}, 200);

			});
		})
	},
	gallery_start: function () {
		let gallery = document.querySelector('.select-box__gallery');
		// вставка цвета
		for (let i = 0; i < this.data.color.length; i++) {
			let el = document.createElement("li");
			el.style.backgroundColor = slot_data.data.color[i].rgb;
			el.dataset.id = [i, this.data.color.length];
			gallery.querySelector(".color-item__list").appendChild(el);
		};
		// вставка фото
		this.gallery_arr([0, this.data.color.length]);
		gallery.querySelector(".color-item__list").querySelectorAll("li").forEach(l => {
			l.addEventListener("click", () => {
				this.gallery_arr(l.dataset.id);
			});
		});
	},
	gallery_arr: function (id) {
		let img_arr = this.data.img[id[0]];
		let img = document.querySelector('.watch-gallery__item-img');
		document.querySelector('.watch-gallery__img-box').dataset.img_url = img_arr;
		document.querySelector('.watch-gallery__img-box').dataset.id = id;
		img.src = img_arr[0];
		img.dataset.id = 0;
		let next_id = [1, img_arr.length];
		document.querySelector('.watch-gallery__arrow_right').dataset.id = next_id;
		document.querySelector('.watch-gallery__arrow_left').dataset.id = -1;
	},
	addInCard: function () {
		if (this.bayList.has(this.data.id)) {
			let obj = this.bayList.get(this.data.id);
			let id = Object.keys(obj).length;
			let k = 0;
			for (const key in this.bayList.get(this.data.id)) {
				if (obj[key].size != this.data.size || obj[key].color.id != this.data.color.id) {
					id -= 1;
				} else {
					k = key;
					break;
				}
			}
			if (id == 0) {
				id = Object.keys(obj).length;
				obj[id] = JSON.parse(JSON.stringify(this.data));
				this.bayList.set(this.data.id, obj);
			}
			else if (id > 0) {
				obj[k] = JSON.parse(JSON.stringify(this.data));
				this.bayList.set(this.data.id, obj);
			}
		}
		else {
			let obj = {
				0: JSON.parse(JSON.stringify(this.data))
			}
			this.bayList.set(this.data.id, obj);
		}
		console.log(this.bayList);
		console.log(this.bayList.get(this.data.id));
	},
	removeFromCard: function (id) {
		id = JSON.parse(id)['id'];
		let obj = this.bayList.get(id[0]);
		this.count -= obj[id[1]].quantity;
		this.sum -= Number(obj[id[1]].cost[0] + '.' + obj[id[1]].cost[1]) * obj[id[1]].quantity;
		if (this.sum < 0) this.sum = 0;
		delete obj[id[1]];
		if (Object.keys(obj).length == 0) this.bayList.delete(id[0]);
		let parent = document.querySelector('.bay-box__total');
		parent.querySelector('.total__quantity').textContent = this.count;
		parent.querySelector(".total__sum").textContent = String(this.sum.toFixed(2)).replace('.', ',');
	},
	getDataSelect: function (dsize, dcolor) {
		let section = document.querySelector('.select-box__item-data');
		let size = section.querySelector(".size__list-size");
		let color = section.querySelector(".color__color-item");
		let inp = section.querySelector('.quantity__box');
		// defolt ---
		this.data.color_arr = JSON.parse(JSON.stringify(this.data.color));
		this.data.quantity = 1;
		inp.value = 1;
		if (dsize > 0) {
			this.data.size = size.querySelectorAll('.list-size__item')[dsize - 1].textContent;
			size.querySelectorAll('.list-size__item')[dsize - 1].className += ' list-size__item_select';
		}
		else {
			this.data.size = size.querySelector('.list-size__item').textContent;
			size.querySelector('.list-size__item').className += ' list-size__item_select';
		}
		if (color.querySelectorAll('.color-item__item')[dcolor]) {
			this.data.color = this.data.color_arr[dcolor];
			color.querySelectorAll('.color-item__item')[dcolor].className += ' color-item__item_select';
		}
		// --------
		inp.addEventListener('focusout', () => {
			if (inp.value > 0) {
				this.data.quantity = Math.trunc(Number(inp.value));
			}
		})
		size.querySelectorAll('.list-size__item').forEach(el => {
			el.addEventListener("click", () => {
				if (size.querySelector('.list-size__item_select')) {
					size.querySelector('.list-size__item_select').className = 'list-size__item';
				}
				el.className = el.className + ' ' + el.className + '_select';
				this.data.size = el.textContent;
			});
		});
		color.querySelectorAll('.color-item__item').forEach(el => {
			el.addEventListener("click", () => {
				if (color.querySelector('.color-item__item_select')) {
					color.querySelector('.color-item__item_select').className = 'color-item__item';
				}
				el.className = el.className + ' ' + el.className + '_select';
				this.data.color_arr.forEach(c => {
					if (c.id == el.dataset.id) {
						this.data.color = c;
					}
				});
			});
		});
	}
}