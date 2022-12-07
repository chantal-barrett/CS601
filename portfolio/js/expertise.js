var expertiseApp = new Vue({
    el: '#expertiseApp',
    data: {
        sections: [
            {
                title: "Programming Languages",
                imageSource: "content/code.png",
                imageAlt: "Code icon",
                skills: [
                    'JavaScript',
                    'TypeScript',
                    'HTML/CSS/SAAS',
                    'C#',
                    'PHP',
                    'SQL',
                    'Python',
                    'C++',
                    'Visual Basic',
                    'Vue.js',
                    'Angular',
                    'Swift'
                ]
            },
            {
                title: "Tools and Technologies",
                imageSource: "content/tools.png",
                imageAlt: "Tools icon",
                skills: [
                    'Git',
                    'MongoDB',
                    'Node.js',
                    'Adobe Experience Manager',
                    'Coveo'
                ]
            },
            {
                title: "Industry Knowledge",
                imageSource: "content/intelligent-person.png",
                imageAlt: "Knowledge icon",
                skills: [
                    'Agile Methodology',
                    'Test Driven Development',
                    'Behavior Driven Development',
                    'Extreme Programming',
                    'Program/Project Management',
                    'Leadership',
                    'Mentoring'
                ]
            }
        ]
    }
});