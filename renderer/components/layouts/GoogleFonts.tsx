const fontFamilies = [
  //
  `family=Noto+Sans+JP:wght@100..900`,
  `display=swap`,
];

export const GoogleFonts = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?${fontFamilies.join("&")}`}
      />
    </>
  );
};
