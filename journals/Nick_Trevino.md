# Nicholas Trevino's Daily Journal

1 week:
Went over ideas for different types of Apps we could make and came across creating a service type of App. As a team we all joined Excalidraw and started to draw out and also list types of components that are going to be inside the App. Afters a couple of tries we were able to piece together a more refined MVP. Then we created a GitLab Group and then started creating issues to go on the board to have a clear understanding of what we need to create. Towards the end of the week we also refined wireframing for the project..

2 week:
Going into the second we started to configure are Docker containers which took a little of trial and error but we eventually got them running. Then as a group we created a test schema to get used to making migration tables. Then we jumped over to the queries and made test CRUD for those. We did the same for are routes Which includes linking the routes in the main.py and also making the connections to the DB. This way we had a template to kind of run off of since FastApi was fairly still new to us. Tested in Docs in order to get a better understanding of the flow of data.

3 week:
Beginning of this week we started to tackle the auth side of the project which took us a while since we didn't understand what was happening with the hashed password. But after looking over the code for a while. We were able to understand why errors were happening which was because we still had some gaps in our knowledge with their auth package and also how the pydantic models need to receive the information. Towards the end of this week i create the BE Service Update and delete. Figure out how to use the token on the front end in order to send calls back to auth protected routes.

4 week:
This was the week of Spring break in which I broke off and created Create and get all for appointments. Created the Useuser file in order to pull info from the user on the front end. Started creating auth side components in order to pull specific technicians from a specific business.

5 Week:
When coming back from the break Created the tech client side page from the tech parent to the create, edit, delete on the front end for technicians. Had to rework checklist BE since it was suited to the use of the app. Reworked the nav bar and styling on the tech page.
Started Deployment which took use about 4 days all around because we were running into different errors which came from caprover and also auth library. Had to recreate data base and fix minor bugs throughout the code to allow all test to pass in pipeline. Verified all parts are working. UI design next part on the list since functionality of the site is good.
