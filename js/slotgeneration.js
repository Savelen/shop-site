let slot = {
	check: [],
	add_events: function (fun) {
		slot.check.forEach(inp => {
			inp.addEventListener('click', fun);
		});
	},
	remove_events: function (fun) {
		slot.check.forEach(inp => {
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
		slot.show_slot();
		if (this.checked && this.name != "kids") {
			// проверяем активен ли cheackbox kids если да, то меняем генерацию
			let kid = document.querySelector("label.checkbox-item__label_kids").querySelector("input");
			if (!kid.checked) {
				let rem = document.querySelector('div.' + this.name).querySelectorAll('div.slot-item');
				rem.forEach(r => r.parentElement.removeChild(r));
				ajax_conect(this.name);
				count_list(0, 'u');
			}
			if (kid.checked) {
				let rem = document.querySelector('div.' + this.name).querySelectorAll('div.slot-item');
				rem.forEach(r => r.parentElement.removeChild(r));
				ajax_conect(this.name, 0, 3, 1);
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
				if (slot.check[0].checked) {
					// удаляем взрослую одежду
					let rem = document.querySelector("div.men__slot").querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					ajax_conect("men", 0, 3, 1);
					count_list(0, 'men', 1);
				}
				if (slot.check[1].checked) {
					// удаляем взрослую одежду
					let rem = document.querySelector("div.women__slot").querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					ajax_conect("women", 0, 3, 1);
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
				if (slot.check[0].checked) {
					// удаляем детскую одежду
					ajax_conect("men");
					count_list(0, 'u');
				}
				if (slot.check[1].checked) {
					// удаляем детскую одежду
					ajax_conect("women");
					count_list(0, 'u');
				}

			}
		}
	},
	all_slot: function () {
		slot.show_slot();
		slot.check.forEach(inp => {
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
				ajax_conect(this.name, 0, 100, 0, true);
			}
			if (kid.checked) {
				let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
				rem.forEach(r => r.parentElement.removeChild(r));
				ajax_conect(this.name, 0, 100, 1, true);
			}
		}
		else if (this.name == "kids") {
			if (this.checked) {
				// выдаём детскую
				if (slot.check[0].checked) {
					// удаляем взрослую одежду
					let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					ajax_conect('men', 0, 100, 1, true);
				}
				if (slot.check[1].checked) {
					// удаляем взрослую одежду
					let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					ajax_conect("women", 0, 100, 1, true);
				}
			}
			else {
				// генерируем взрослую
				if (slot.check[0].checked) {
					// удаляем детскую одежду
					let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					ajax_conect('men', 0, 100, 0, true);
				}
				if (slot.check[1].checked) {
					// удаляем детскую одежду
					let rem = document.querySelector('div.all-item').querySelectorAll('div.slot-item');
					rem.forEach(r => r.parentElement.removeChild(r));
					ajax_conect("women", 0, 100, 0, true);
				}
			}
		}

	},
	checked_box: function (all) {
		if (!all) {
			slot.check.forEach(inp => {
				if (inp.checked && inp.name != "kids") {
					slot.add_slot.call(inp);
				}
			});
		}
		else {
			slot.check.forEach(inp => {
				if (inp.checked && inp.name != "kids") {
					slot.all_slot.call(inp);
				}
			});
		}
	}
}