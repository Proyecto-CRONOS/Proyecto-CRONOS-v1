# NEWS

## Changelog

### January 18, 2024
 - Renamed components:
   - CronogramaListItem to ScheduleListItem
   - CronogramaList to ScheduleList
   - DetailCronograma to ScheduleDetail
   - EditCronograma to ScheduleEdit
   - AddCronograma to ScheduleCreate
   - CronogramaCardsList to ScheduleCardsList
   - ScheduleCard to ScheduleCardList
   - AddCardCronograma to ScheduleCardsAdd
   - Cronogramas to Schedules
 - Improved styles in:
   - ScheduleCardItem
   - ScheduleListItem
   - Home
   - ScheduleCardsAdd
   - ScheduleCardList
   - ScheduleCreate
   - ScheduleDetail
   - ScheduleEdit
   - ScheduleList
   ScheduleForm.
 - Refactored Home with new logos
 - Refactored and improved general styles, moving components styles to styles file.
 - DatePicker in ScheduleForm
 - Success Banner replaced by Toasts
 - Toast for ScheduleEdit added
 - Bug fixed: Infinite rendering in ScheduleEdit
 - Bug fixed: ScheduleCardsAdd was not deleting and sorting properly
 - Bug fixed: ScheduleCardsAdd was not current cards
 - ScheduleCardsAdd redirects to ScheduleDetails after save
 - ScheduleCardsList and ScheduleDetails shows a toast when the cards where updated
 - Created EditFAB
 - ScheduleDetails change the FAB to EditFAB

### November 15, 2023
- Sort schedule cards screen.

### November 14, 2023
- Major refactoring and linter fixes.
- Form handles errors after try to send.
- Removed double header and back buttons.

### October 2, 2023
- Create Cronograma feature added.
- Replaced navigation prop in every component to useNavigation().
- Replaced icons in navigation tabs.
- Reduced tab items to Calendarios and Cards.
- Created a floating action button component
- Floating action button added in Calendarios list and Cards list to create new entities.
- Some files and components were renamed:
  - AllCronogramas to CronogramasList
  - Cronograma to CronogramaListItem
  - AllCronogramas to CardsList
  - Card to CardListItem
- New design for Cronogramas list.
- AllCronogramas and CronogramasList were merged.
- AllCards and CardsList were merged.
- ScrollView added in Calendarios form and list 
- Success operation dialog after save a Calendario 
- Created wrapper components to handle Screens.

### September 26, 2023

#### New Features and Enhancements:
- CardImage component implemented.
- Card component with image integration.
- Linter fixes.
- Save card with image upload.

### September 22, 2023

#### New Features and Enhancements:

- Implemented ScheduleCard model.
- Refactored Schedule and Card model and related components.

### September 21, 2023

#### New Features and Enhancements:

- Implemented basic functionality for expo-sqlite.
- Added data retrieval in the CardList component and CronogramaList component.
- Introduced a basic model for managing Schedules and Cards.
- Included a dummy database seed, loaded in the useEffect of the App component.
- Configured ESLint and Prettier for code formatting.
- Conducted component refactoring for improved code organization:
  - App
  - Cronograma
  - CronogramaList
  - AllCronogramas
  - CardList
  - Added a new component: Card.
- Added a TODO.md list file for tracking tasks.
- Created a NEWS.md file to keep a record of project updates.
- Enhanced the .gitignore file for better version control.
- Updated the README.md with a ramp-up guide and added a badge.
- Implemented a GitHub action to run a linter for code quality checks.
- Updated the package-lock.json for package management.

These changes reflect the recent updates and improvements made to the project.
