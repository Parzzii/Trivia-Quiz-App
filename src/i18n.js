import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
      resources: {
        en: {
          translation: {
            welcome: "KNOW IT ALL!",
            subtitle: "Test Your Knowledge and Become the Ultimate Know-It-All!",
            play_now: "PLAY NOW!",
            know_it_all: "Know It All",
            login : "Login",
            register: "Register",
            random: "Random",
            friends: "Friends",
            support: "Support",
            contact_us: "Contact Us",
            languages: "Languages",
            english: "English",
            russian: "Russian",
            back: "Back",
            available: "Available Languages",
            currently_support: "We currently support the following languages:",
            contact_title: "If you have any questions, feel free to reach out to us.",
            email: "Email",
            phone: "Phone",
            contact_email: "contact@yourdomain.com",
            contact_form: "Contact Form",
            support_note: "**Our team should get back to you within 3-5 business days. If no response by that time, please call our support number. Thank you!",
            send: "Send",
            contact_form_email_placeholder: "Email Address",
            contact_form_subject_placeholder: "Subject",
            contact_form_message_placeholder: "Message",
            username: "Username",
            password: "Password",
            confirm_password: "Confirm Password",
            username_placeholder: "Create your username",
            password_placeholder: "Create a password",
            confirm_password_placeholder: "Confirm your password",
            enter_username_placeholder: "Enter your username",
            enter_password_placeholder: "Enter your password",
            passwords_do_not_match: "Passwords do not match",
            registration_successful: "Registration successful! ",
            registration_error: "Registration error. Please try again.",
            invalid_username_or_password: "Invalid username or password. Please try again.",
            choose_a_topic: "Choose a Topic",
            select_difficulty: "Select Difficulty",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
            no_categories_found: "No categories available",
            loading_categories: "Loading categories",
            search_topics: "Search topics...",
            rank: "Rank",
            name: "Name",
            score: "Score",
            game_mode: "Game Mode",
            leaderboard: "Leaderboard",
            logout: "Logout",
            start_game: "Start Game",
            game_over: "Game Over",
            your_score: "Your Score",
            correct_answers: "Correct Answers",
            loading_questions: "Loading questions",
            correct: "Correct!",
            incorrect: "Incorrect! The correct answer is:",
            timer: "Timer",
            your_final_score: "Your final score is",
            play_again: "Play Again",
            congradulations_all_correct: "Congratulations! You got all the answers correct!",
            show_answers: "Show Answers",
            questions_and_correct_answers: "Questions and Correct Answers",
            replay: "Replay",
            correct_answer: "Correct Answer",
            question: "Question",
            of: "of",
            use_hint: "Use Hint",
            left: "left",
            next_question: "Next Question",
            hint: "Hint",


          }
        },
        ru: {
          translation: {
            welcome: "ЗНАЙ BCË!",
            subtitle: "Проверьте свои знания и станьте настоящим знатоком!",
            play_now: "ИГРАТЬ СЕЙЧАС!",
            know_it_all: "Знай Всё",
            login : "Войти",
            register: "Регистрация",
            random: "Случайный",
            friends: "Друзья",
            support: "Поддержка",
            contact_us: "Связаться c нами",
            languages: "Языки",
            english: "Английский",
            russian: "Русский",
            back: "Назад",
            available: "Доступные языки",
            currently_support: "Мы поддерживаем следующие языки:",
            contact_title: "Если y вас есть вопросы, не стесняйтесь обращаться к нам.",
            email: "Электронная почта",
            phone: "Телефон",
            contact_email: "контакт@пример.рф",
            contact_form: "Форма обратной связи",
            support_note: "**Наша команда должна связаться c вами в течение 3-5 рабочих дней. Если к этому времени не будет ответа, пожалуйста, позвоните на наш номер поддержки. Спасибо!",
            send: "Отправить",
            contact_form_email_placeholder: "Адрес электронной почты",
            contact_form_subject_placeholder: "Тема",
            contact_form_message_placeholder: "Сообщение",
            username: "Имя пользователя",
            password: "Пароль",
            confirm_password: "Подтвердите пароль",
            username_placeholder: "Введите имя пользователя",
            password_placeholder: "Придумайте пароль",
            confirm_password_placeholder: "Подтвердите пароль",
            enter_username_placeholder: "Введите имя пользователя",
            enter_password_placeholder: "Введите пароль",
            passwords_do_not_match: "Пароли не совпадают",
            registration_successful: "Регистрация прошла успешно! ",
            registration_error: "Ошибка регистрации. Пожалуйста, попробуйте еще раз.",
            invalid_username_or_password: "Неверное имя пользователя или пароль. Пожалуйста, попробуйте еще раз.",
            choose_a_topic: "Выберите тему",
            select_difficulty: "Выберите сложность",
            easy: "Легко",
            medium: "Средне",
            hard: "Трудно",
            no_categories_found: "Категории недоступны",
            loading_categories: "Загрузка категорий",
            search_topics: "Поиск тем...",
            rank: "Ранг",
            name: "Имя",
            score: "Очки",
            game_mode: "Режим игры",
            leaderboard: "Таблица лидеров",
            logout: "Выйти",
            start_game: "Начать игру",
            game_over: "Конец игры",
            your_score: "Ваш счет",
            play_again: "Играть снова",
            correct_answers: "Правильные ответы",
            loading_questions: "Загрузка вопросов",
            correct: "Правильно!",
            incorrect: "Неправильно! Правильный ответ:",
            timer: "Таймер",
            your_final_score: "Ваш итоговый счет",
            congradulations_all_correct: "Поздравляем! Вы ответили правильно на все вопросы!",
            show_answers: "Показать ответы",
            questions_and_correct_answers: "Вопросы и правильные ответы",
            replay: "Повторить",
            correct_answer: "Правильный ответ",
            question: "Вопрос",
            of: "из",
            use_hint: "Использовать подсказку",
            left: "осталось",
            next_question: "Следующий вопрос",
            hint: "Подсказка",


        }
      }
    }
  });

export default i18n;