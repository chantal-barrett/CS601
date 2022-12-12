var expertiseApp = new Vue({
    el: '#expertiseApp',
    data() {
        return {
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
        };
    },
    template: `
        <div id="expertiseApp" class="expertise-container">
        <section v-for="section in sections" class="expertise-section">
            <img class="expertise-icon" :src="section.imageSource" :alt="section.imageAlt" width="70" height="70">
            <h3>{{ section.title }}</h3>
            <div class="expertise-content fadein">
                <ul>
                    <li v-for="skill in section.skills">{{ skill }} </li>
                </ul>
            </div>
        </section>
        </div>
    `,
});