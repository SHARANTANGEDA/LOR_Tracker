## Department of Computer Science and Information Systems(CSIS) - Lor Tracker
A Design Project with Prof. Tathagata Ray, Head of the Department(HOD) of CSIS department.

Used Django (Rest Framework), ReactJS and Redux, PostgreSQL, Redis server with Django-celery for push notifications and periodic alerts.

Google OAuth is used as authentication schema.

This is going to be used by all departments in BITS Pilani, for tracking Letters of Recommendation and management of departmental activities.

#### *Previously MySQL was used for development purpose but now the application is ported completely to use PostgreSQL as the database, due to PostgreSQL's advanced fields like jsonfield etc.*
### Requirements to be able to run it offline
    Have smtp email address, google OAuth Client API Keys.
    Also your machine must have redis server running, inorder for celery to work
    PostgreSQL is the database used for this
    
