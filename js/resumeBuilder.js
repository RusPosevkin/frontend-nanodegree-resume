var replaceData = function (template, data) {
  var dataItems = template.match(/%\w+%/g);

  if (dataItems.length === 1) {
    return template.replace(dataItems[0], data);
  } else {
    return dataItems.reduce(function(result, item) {
      return result.replace(item, data[item.slice(1, -1)]);
    }, template);
  }
};

var bio = {
  name: 'Ruslan Posevkin',
  role: 'Frontend Engineer',
  contacts: {
    mobile: '+7 123 4567890',
    email: 'example@gmail.com',
    github: 'RusPosevkin',
    location: 'Saint Petersburg, Russia'
  },
  welcomeMessage: 'Welcome message',
  skills: ['HTML', 'CSS', 'JavaScript'],
  biopic: 'https://avatars1.githubusercontent.com/u/1483747?v=3&s=460',
  display: function () {
    var headerPrependLayout = [];

    headerPrependLayout.push(replaceData(HTMLheaderName, bio.name));
    headerPrependLayout.push(replaceData(HTMLheaderRole, bio.role));

    $('#header').prepend(headerPrependLayout.join(''));

    var contactLayout = [];

    for (datum in bio.contacts) {
      contactLayout.push(replaceData(HTMLcontactGeneric, {
        contact: datum,
        data: bio.contacts[datum]
      }));
    }

    var headerAppendLayout = [];

    $('#topContacts').append(contactLayout.join(''));

    headerAppendLayout.push(replaceData(HTMLbioPic, bio.biopic));
    headerAppendLayout.push(replaceData(HTMLwelcomeMsg, bio.welcomeMessage));
    headerAppendLayout.push(HTMLskillsStart);

    $('#header').append(headerAppendLayout.join(''));

    var skillsLayout = [];

    bio.skills.forEach(function (skill) {
      skillsLayout.push(replaceData(HTMLskills, skill));
    });

    $('#skills').append(skillsLayout.join(''));
  }
};

var education = {
  schools: [
    {
      name: 'ITMO University',
      location: 'Saint Petersburg, Russia',
      degree: 'PhD',
      majors: ['Software Engineering'],
      dates: '2014–2018',
      url: 'http://www.ifmo.ru/',
    },
    {
      name: 'ITMO University',
      location: 'Saint Petersburg, Russia',
      degree: 'MSc',
      majors: ['Software Engineering'],
      dates: '2012–2014',
      url: 'http://www.ifmo.ru/',
    },
    {
      name: 'Volgograd State Technical University',
      location: 'Volgograd, Russia',
      degree: 'BSc',
      majors: ['Software Engineering'],
      dates: '2008–2012',
      url: 'http://www.volpi.ru/',
    }
  ],
  onlineCourses: [
    {
      title: 'MongoDB University',
      school: 'MongoDB for Node.js Developers',
      dates: 'May 2016',
      url: 'https://university.mongodb.com/'
    }
  ],
  display: function () {
    education.schools.forEach(function (school) {
      var schoolsLayout = [];

      schoolsLayout.push(replaceData(HTMLschoolName, school.name));
      schoolsLayout.push(replaceData(HTMLschoolDegree, school.degree));
      schoolsLayout.push(replaceData(HTMLschoolDates, school.dates));
      schoolsLayout.push(replaceData(HTMLschoolLocation, school.location));
      schoolsLayout.push(replaceData(HTMLschoolMajor, school.majors.join(', ')));

      $('#education').append(HTMLschoolStart);
      $('.education-entry').last().append(schoolsLayout.join(''));
    });

    $('#education').append(HTMLonlineClasses);

    education.onlineCourses.forEach(function (course) {
      var courseLayout = [];

      courseLayout.push(replaceData(HTMLonlineTitle, course.title));
      courseLayout.push(replaceData(HTMLonlineSchool, course.school));
      courseLayout.push(replaceData(HTMLonlineDates, course.dates));
      courseLayout.push(replaceData(HTMLonlineURL, course.url));

      $('#education').append(HTMLschoolStart);
      $('.education-entry').last().append(courseLayout.join(''));
    });
  }
}

bio.display();
education.display();
