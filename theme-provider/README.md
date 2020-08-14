# Theme provider
This component provides a context to hold application common styles and variables.
```jsx
const basicTheme = {
 variables: {
   customWidth: 10, // simple variables
 },
 palette,   // Variable with collors
 shadows,   // Variable with shadows 
 styles: {
   // Common styles
 },
};

// Render
<ThemeProvider theme={basicTheme}>
  {'your application'}
</ThemeProvider/>
```
