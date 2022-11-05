// Класс реализует создание input-поля с телефонной маской:
class PhoneMask {
    constructor() {
        this.elem = null;   // Input поле с маской для телефона
        this.render();      // Первоначальный рендер элемента
    }

    // Создание поля ввода для номера телефона:
    render = () => {
        this.elem = document.createElement("input");                // Создание input-поля для тел. макси
        this.elem.type = "tel";                                     // Добавления типа поля
        this.elem.placeholder="Phone number";                       // Добавление placeholder-а
        this.elem.maxlength="18"                                    // Добавление макс. длины
        this.elem.classList.add("input");                           // Добавление стилистики
        this.elem.addEventListener("input", this.createPhoneMask);  // Обработка события "Ввод"
    }

    // Получение телефонной макси:
    getElem = () => {
        return this.elem;
    }

    // Извлечение из строки всех символов кроме чисел:
    validationInputValue = (someValue) => {
        return someValue.replace(/\D/g, '');
    }

    // Реализация телефонной маски:
    createPhoneMask = () => {
        let currentCursor;              // Текущее положение курсора при вводе;
        let validNumber = "";           // Input-элемент с номером телефона и реализованной маской;

        // Удаляем из номера все Не числа и фиксируем полученное значение:
        let inputWithNumbers = this.validationInputValue(this.elem.value);

        // Если пользователь ввёл "+", то добавляем его в отредактированный номер
        if (this.elem.value[0] === '+') {
            validNumber = "+";
        }

        // Если курсор пользователя при вводе был не в конце строки, то:
        if (this.elem.value.length !== this.elem.selectionStart) {
            // Запоминаем положение курсора
            currentCursor = this.elem.selectionStart;
        }

        // Останавливаем дальнейшие вычисления, если выполняются 2 условия:
        // 1) Пользователь ввёл запрещённые символы (то есть строка с числами оказалась пустой)
        // 2) Пользователь не ввёл +
        if (inputWithNumbers.length === 0 && validNumber === "" ) {
            this.elem.value = "";
            return;
        }
        // Если этого условия не будет, то введённые пользователем запрещённые символы преобразуются
        // В пустую строку и автоматически попадает под условие "else" в коде ниже и ломает код

        // Если выполняется хотя бы одно из условий, то маска не требуется:
        // 1) Пользователь ввёл + И следующее введённое значение Не равно 7
        // 2) Пользователь ввёл любое число, кроме 7, 8, 9
        if (validNumber[0] === "+" && inputWithNumbers[0] !== "7" || inputWithNumbers[0].match(/[^789]/)) {
            validNumber = `+${inputWithNumbers}`;
            this.elem.value = validNumber;
        // Во всех остальных случаях потребуется маска:
        } else {
            // Анализируем первый символ:
            switch (inputWithNumbers[0]) {
                // Если первый символ равен 9, то
                case '9':
                    // Добавляем в числовой номер семёрку               
                    inputWithNumbers = `7${inputWithNumbers}`;
                    // Добавляем "+" в отредактированный номер
                    validNumber = "+";
                    break;
                // Если первый символ равен 7, то
                case '7':
                    // Добавляем "+" в отредактированный номер
                    validNumber = "+";
                    break;                    
            }

            // Добавляем в отредактированный номер первую цифру
            validNumber += inputWithNumbers.substring(0,1);

            // Если длина номера больше 1, то
            if (inputWithNumbers.length > 1) {
                // Добавляем пробел
                validNumber += ' ';
                // Вставляем в отредактированный номер необходимую часть чисел
                validNumber += inputWithNumbers.substring(1,4);
            } 
            // Если длина номера больше 4, то
            if (inputWithNumbers.length > 4) {
                // Добавляем пробел
                validNumber += ' ';
                // Вставляем в отредактированный номер необходимую часть чисел
                validNumber += inputWithNumbers.substring(4,7);
            }
            // Если длина номера больше 7, то
            if (inputWithNumbers.length > 7) {
                // Добавляем пробел
                validNumber += '-';
                // Вставляем в отредактированный номер необходимую часть чисел
                validNumber += inputWithNumbers.substring(7,9);
            }
            // Если длина номера больше 9, то
            if (inputWithNumbers.length > 9) {
                // Добавляем пробел
                validNumber += '-';
                // Вставляем в отредактированный номер необходимую часть чисел
                validNumber += inputWithNumbers.substring(9,11);
            }
        }

        // Добавляем отредактированный номер на страницу
        this.elem.value = validNumber;

        // Если пользователь начал ввод Не с конца строки, то
        if (currentCursor) {
            // Возвращаем положение курсора
            this.elem.selectionStart = currentCursor;
            this.elem.selectionEnd = currentCursor;
        }
    }
}

// Получение элемента, в котором будет размещена маска:
const wrapper = document.querySelector(".form-inner");
// Создание и последовательное получение input-поля с валидацией(телефонной маски):
const phoneMask = new PhoneMask().getElem();
// Размещение маски на сайте:
wrapper.append(phoneMask);