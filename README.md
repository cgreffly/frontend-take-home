# Frontend Take-Home Assignment

Run with: npm run dev

## Future / Real World Improvements

### Data Table

I'd use TanStack Table if this had been going into production because I would want the ability to support sorting, column resizing or row selection. It seemed like overkill for this project though.

### Search

I decided to add a debounce so we are not making API calls on every keystroke, but I could see why we might decide to accept the heavier call load in exchange for a faster user experience. Also, depending on the size of the data set, I might suggest that we preload all data and then our search could be just client-side filtering which would be much faster. In the case of these two tables, I would think that might be a reasonable approach for the roles table, as I don't imagine most companies would have over 100 roles.

I opted to simplify the search placeholder text because I implemented a search that searches all text (not date) fields in the table.

### Error Handling

My error and empty states are pretty bare bones, simple text and toast notifications. With more time, I would build out full error handling pages and components, especially for the case of the tables not loading.

### Styling

I decided to use Radix Primitives instead of Themes because I wanted to avoid overrides and I like the blank slate flexibility. I also use Radix Primatives at my current job and feel more comfortable with them, but I could see how Themes would make for less clutter on the pages if we were good about not doing overrides :)
