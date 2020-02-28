function count_list(now, gender, kids = 0) {
	// запрашиваем общее количество товара
	let count_page = new XMLHttpRequest();
	count_page.open('GET', '../Component/prepare_item.php?gender=""&start=0&get=0&kids=' + kids + '&pag=true', true);
	json = count_page.addEventListener('readystatechange', function () {
		if (count_page.readyState == 4 && count_page.status == 200) {
			let respons = JSON.parse(count_page.responseText);
			// для каждого пола отдельно
			if (respons[0].pagination.length != 0) {
				for (count in respons[0].pagination) {
					// вычисляем колличество занимаемых страниц
					let page = Math.ceil(respons[0].pagination[count] / 3);
					// вставляем итог с проверкой конечности
					if (count == "men" && gender == 'men' || gender == "u") {
						let p = document.querySelector('div.pagination_men');
						let text = p.querySelector('span.text');
						if ((now / 3 + 1) >= page) text.dataset.go = false;
						else text.dataset.go = true;
						text.textContent = (now / 3 + 1) + "/" + page;
					}
					if (count == "women" && gender == "women" || gender == "u") {
						let p = document.querySelector('div.pagination_women');
						let text = p.querySelector('span.text');
						if ((now / 3 + 1) >= page) text.dataset.go = false;
						else text.dataset.go = true;
						text.textContent = (now / 3 + 1) + "/" + page;

					}
				}
			} else {
				let p = document.querySelector('div.pagination_men');
				let text = p.querySelector('span.text');
				text.textContent = "0/0";
				p = document.querySelector('div.pagination_women');
				text = p.querySelector('span.text');
				text.textContent = "0/0";
			}
		}
	})
	count_page.send();
}
function ui_pagination(arrow, go) {
	let arrow_two;
	// если нажимаем стрелку вперёд
	if (go > 0) {
		arrow_two = arrow.parentElement.querySelector('span.arrow-left');
		// вызов до
		if (arrow.parentElement.querySelector('span.text').dataset.go == "true") {
			remove_slot(arrow);
			if (arrow.parentElement.dataset.kids != '1') {
				count_list(arrow.dataset.start, arrow.dataset.gender);
				ajax_conect(arrow.dataset.gender, arrow.dataset.start);
			}
			else {
				count_list(arrow.dataset.start, arrow.dataset.gender, 1);
				ajax_conect(arrow.dataset.gender, arrow.dataset.start, 3, 1);
			}
			//меняем следующий номер старта
			arrow.dataset.start = Number(arrow.dataset.start) + Number(go);
			arrow_two.dataset.start = Number(arrow_two.dataset.start) + Number(go);
		}
	}
	// если нажимаем стрелку назад
	if (go < 0) {
		// первый элемент или нет
		if (arrow.dataset.start == 0) {
			return 0;
		} else {
			arrow_two = arrow.parentElement.querySelector('span.arrow-right');
			//меняем следующий номер старта
			arrow.dataset.start = Number(arrow.dataset.start) + Number(go);
			arrow_two.dataset.start = Number(arrow_two.dataset.start) + Number(go);
			//вызов после

			remove_slot(arrow);
			if (arrow.parentElement.dataset.kids != '1') {
				count_list(arrow.dataset.start, arrow.dataset.gender);
				ajax_conect(arrow.dataset.gender, arrow.dataset.start);
			}
			else {
				count_list(arrow.dataset.start, arrow.dataset.gender, 1);
				ajax_conect(arrow.dataset.gender, arrow.dataset.start, 3, 1);
			}
		}
	}
}
function remove_slot(arrow) {
	let parent_arrow = arrow.parentElement;
	let slot = document.querySelector('div.' + parent_arrow.dataset.gender);
	let remove = slot.querySelectorAll('div.slot_item');
	remove.forEach(item => slot.removeChild(item));
}
// запуск генерации слотов и пагинации
let pagination = document.querySelectorAll('div.pagination');
pagination.forEach(item => {
	let arrow_arr = item.querySelectorAll('span.arrow');
	arrow_arr.forEach(arrow => {
		arrow.addEventListener("click", () => {
			ui_pagination(arrow, arrow.dataset.go);
		});
	})
});
