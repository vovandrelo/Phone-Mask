document.addEventListener("DOMContentLoaded", () => {
    const fieldInput = document.querySelector('input');

    // Функция преобразует введённый номер в числа
    const convertInputToNumbers = input => {
        return input.value.replace(/\D/g, '');  // Используем метод replace
    };

    // Создание маски для телефона
    const convertInput = event => {
        let input = event.target;   // Получаем объект события
        let currentCursor;          // Отслеживает положение курсора при вводе
        let finalNumber = "";       // Содержит отредактированный номер, который будет добавляться на страницу

        // Удаляем из номера все Не числа и фиксируем полученное значение
        let inputNumbers = convertInputToNumbers(input);

        // Если пользователь ввёл "+", то добавляем его в отредактированный номер
        if (input.value[0] === '+') {
            finalNumber = "+";
        }

        // Если курсор пользователя при вводе был не в конце строки, то:
        if (input.value.length !== input.selectionStart) {
            // Запоминаем положение курсора
            currentCursor = input.selectionStart;
        }

        // Останавливаем дальнейшие вычисления, если выполняются 2 условия:
        // 1) Пользователь ввёл запрещённые символы (то есть строка с числами оказалась пустой)
        // 2) Пользователь не ввёл +
        if (inputNumbers.length === 0 && finalNumber === "" ) {
            input.value = "";
            return;
        }
        // Если этого условия не будет, то введённые пользователем запрещённые символы преобразуются
        // В пустую строку и автоматически попадает под условие "else" в коде ниже и ломает код

        // Если выполняется хотя бы одно из условий, то маска не требуется:
        // 1) Пользователь ввёл + И следующее введённое значение Не равно 7
        // 2) Пользователь ввёл любое число, кроме 7, 8, 9
        if (finalNumber[0] === "+" && inputNumbers[0] !== "7" || inputNumbers[0].match(/[^789]/)) {
            finalNumber = `+${inputNumbers}`;
            input.value = finalNumber;
        // Во всех остальных случаях потребуется маска:
        } else {
            // Анализируем первый символ:
            switch (inputNumbers[0]) {
                // Если первый символ равен 9, то
                case '9':
                    // Добавляем в числовой номер семёрку               
                    inputNumbers = `7${inputNumbers}`;
                    // Добавляем "+" в отредактированный номер
                    finalNumber = "+";
                    break;
                // Если первый символ равен 7, то
                case '7':
                    // Добавляем "+" в отредактированный номер
                    finalNumber = "+";
                    break;                    
            }

            // Добавляем в отредактированный номер первую цифру
            finalNumber += inputNumbers.substring(0,1);

            // Если длина номера больше 1, то
            if (inputNumbers.length > 1) {
                // Добавляем пробел
                finalNumber += ' ';
                // Вставляем в отредактированный номер необходимую часть чисел
                finalNumber += inputNumbers.substring(1,4);
            } 
            // Если длина номера больше 4, то
            if (inputNumbers.length > 4) {
                // Добавляем пробел
                finalNumber += ' ';
                // Вставляем в отредактированный номер необходимую часть чисел
                finalNumber += inputNumbers.substring(4,7);
            }
            // Если длина номера больше 7, то
            if (inputNumbers.length > 7) {
                // Добавляем пробел
                finalNumber += '-';
                // Вставляем в отредактированный номер необходимую часть чисел
                finalNumber += inputNumbers.substring(7,9);
            }
            // Если длина номера больше 9, то
            if (inputNumbers.length > 9) {
                // Добавляем пробел
                finalNumber += '-';
                // Вставляем в отредактированный номер необходимую часть чисел
                finalNumber += inputNumbers.substring(9,11);
            }
        }

        // Добавляем отредактированный номер на страницу
        input.value = finalNumber;

        // Если пользователь начал ввод Не с конца строки, то
        if (currentCursor) {
            // Возвращаем положение курсора
            input.selectionStart = currentCursor;
            input.selectionEnd = currentCursor;
        }
    };

    fieldInput.addEventListener('input', convertInput);
});

