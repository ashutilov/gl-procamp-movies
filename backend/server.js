import express from 'express';
import bodyParser from 'body-parser';
var cors = require('cors')
var uniqid = require('uniqid');

const app = express();
app.use(cors())
app.use(bodyParser.json());

const movies = [
  {
    id: uniqid(),
    title: 'Безумный Макс',
    year: 2015,
    description:
      'Вскоре после отмщения за смерть жены и сына, Макс Рокатански покинул ряды «Основного силового патруля» и уехал в глушь, где скитается в одиночестве, пока мир медленно падает впоследствии нефтяного кризиса и глобальной войны. Не имея ничего, кроме своей машины «Перехватчик», Максу предстоит научиться…',
    cover: 'http://msmagazine.com/blog/wp-content/uploads/2015/05/212061.jpg',
    rating: 8
  },
  {
    id: uniqid(),
    title: 'Matrix',
    year: 2003,
    description:
      'Борцы за свободу Нео, Тринити и Морфеус продолжают руководить восстанием людей против Армии Машин. Для уничтожения системы репрессий и эксплуатации они вынуждены прибегнуть не только к арсеналу превосходного оружия, но и к своим выдающимся навыкам',
    cover:
      'https://ae01.alicdn.com/kf/HTB1TqwQKFXXXXXDXFXXq6xXFXXXT/The-Matrix-1-2-3-MOVIE-Fabric-poster-17-x-13-Decor-05.jpg_640x640.jpg',
    rating: 9
  },
  {
    id: uniqid(),
    title: 'Tor',
    year: 2011,
    description:
      '«Тор» — художественный фильм режиссёра Кеннета Брана, основанный на одноимённых комиксах издательства Marvel Comics. Созданием картины занималась компания Marvel Studios, а распространением Paramount Pictures',
    cover:
      'https://www.heyuguys.com/images/2011/03/Thor-Chris-Hemsworth-Poster.jpg',
    rating: 8
  },
  {
    id: uniqid(),
    title: 'Джанго освобождённый',
    year: 2016,
    description:
      'Эксцентричный охотник за головами, также известный как «Дантист», промышляет отстрелом самых опасных преступников на Диком Западе. Работенка пыльная, и без надежного помощника ему не обойтись. Но как найти такого и желательно не очень дорогого? Беглый раб по имени Джанго — прекрасная кандидатура. Пр…',
    cover:
      'http://collectorsshangri-la.com/media/catalog/product/cache/1/image/8ff1fda1094e6eac698e213e879c9921/d/j/django_unchained.jpg',
    rating: 10
  },
  {
    id: uniqid(),
    title: 'Враг',
    year: 2013,
    description:
      'Взяв наугад кассету с фильмом в видеопрокате, парень с удивлением замечает в одном из эпизодов актёра, который является почти точной его копией, разве что на пару лет моложе. Вскоре желание найти своего двойника превращается для парня в настоящую навязчивую идею. Длительные бесплодные поиски, в ',
    cover:
      'https://cdn1.thr.com/sites/default/files/2013/11/enemy-cartaz-grande.jpg',
    rating: 4
  },
  {
    id: uniqid(),
    title: 'Игра',
    year: 1997,
    description:
      'Николас Ван Ортон — само воплощение успеха. Он преуспевает, он невозмутим и спокоен, привык держать любую ситуацию под контролем. На день рождения Николас получает необычный подарок — билет для участия в «Игре»',
    cover:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkwMDkwNDIxNl5BMl5BanBnXkFtZTgwNzg0NzQxMTE@._V1_.jpg',
    rating: 10
  },
  {
    id: uniqid(),
    title: 'Планета обезьян',
    year: 2017,
    description:
      'Армию генетически измененных обезьян ждет новый вызов: они обязаны вступить в смертельную схватку с армией людей под управлением свирепого полковника. После невероятных потерь посреди своих воинов вождь обезьян Цезарь затевает личную борьбу с темными инстинктами и собирается отомстить за весь свой вид. В конце концов он и полковник должны будут сойтись в эпической битве, которая решит, кто теперь будет править на Земле — люди или обезьяны. ',
    cover:
      'https://i2.wp.com/www.thelyfemagazine.com/wp-content/uploads/2017/08/war3.jpg',
    rating: 10
  },
  {
    id: uniqid(),
    title: 'Оно',
    year: 2017,
    description:
      'Когда в городке Дерри, штат Мэн, начинают пропадать дети, несколько ребят сталкиваются со своими величайшими страхами и вынуждены помериться силами со злобным клоуном Пеннивайзом, чьи проявления жестокости и список жертв уходят в глубь веков. ',
    cover:
      'https://phoenixmilitarynews.com/wp-content/uploads/2017/11/It_2017_poster.jpg',
    rating: 10
  }
];

function validate(data) {
  let errors = {};
  if (data.title === '') errors.title = 'Can not be empty';
  if (data.cover === '') errors.cover = 'Can not be empty';
  if (data.year === '') errors.year = 'Can not be empty';
  if (data.description === '') errors.description = 'Can not be empty';
  if (data.rating === '') errors.rating = 'Can not be empty';
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

app.get('/api/movies', (req, res) => {
  res.json({ movies });
});

app.post('/api/movies', (req, res) => {
  const { errors, isValid } = validate(req.body);
  if (isValid) {
    const { title, cover, year, description, rating } = req.body;
    try {
      movies.push({ id: uniqid(), title, cover, year, description, rating });
    } catch (err) {
      res.status(500).json({ errors: { global: 'Something went wrong!' } });
    }
    res.json({ movie: { title, cover } });
  } else {
    res.status(400).json({ errors });
  }
});

app.put('/api/movies/:id', (req, res) => {
  const { errors, isValid } = validate(req.body);
  let index = '';

  if (isValid) {
    const { id, title, cover, year, description, rating } = req.body;

    try {
      index = movies.findIndex(element => req.params.id === element.id);
      movies[index] = { id, title, cover, year, description, rating };
    } catch (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    res.json({ movie: movies[index] });
  } else {
    res.status(400).json({ errors });
  }
});

app.get('/api/movies/:id', (req, res) => {
  const { errors, isValid } = validate(req.body);

  if (isValid) {
    const { title, cover, year, description, rating } = req.body;
    const id = req.params.id;
    let ind;
    try {
      ind = movies.findIndex(element => id === element.id);
    } catch (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    res.json({ movie: movies[ind] });
  } else {
    res.status(400).json({ errors });
  }
});

app.delete('/api/movies/:id', (req, res) => {
  const id = req.params.id;
  let ind;
  try {
    ind = movies.findIndex(element => id === element.id);
    movies.splice(ind, 1);
  } catch (err) {
    res.status(500).json({ errors: { global: err } });
    return;
  }

  res.json({});
});

app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: 'Work in progress... Please try later...'
    }
  });
});

app.listen(8080, () => console.log('Server is running on localhost:8080'));
