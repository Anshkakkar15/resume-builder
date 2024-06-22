export const nextStep = (pageName) => {
  const currentPage = JSON.parse(sessionStorage.getItem("builder-page")) || [];
  if (!currentPage?.includes(pageName)) {
    currentPage.push(pageName);
  }

  sessionStorage.setItem("builder-page", JSON.stringify(currentPage));
};

export const backStep = (pageName) => {
  const currentPage = JSON.parse(sessionStorage.getItem("builder-page")) || [];
  const newData = currentPage?.filter(
    (elm) => elm?.toLowerCase() !== pageName?.toLowerCase(),
  );
  typeof window !== "undefined" &&
    sessionStorage.setItem("builder-page", JSON.stringify(newData));
};

export const emptySteps = () => {
  typeof window !== "undefined" && sessionStorage.clear();
};
