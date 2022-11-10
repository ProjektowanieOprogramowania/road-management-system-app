
export const dateFromArray = (dateArray : string) => {
  return new Date(
  Number(dateArray[0]),
    Number(dateArray[1]),
    Number(dateArray[2]),
    Number(dateArray[3]),
    Number(dateArray[4]),
    Number(dateArray[5])
  );
}
