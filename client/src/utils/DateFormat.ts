const formatDate = (dateString: any): string => {
  const months: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date: Date = new Date(dateString);

  const day: number = date.getDate();
  const monthIndex: number = date.getMonth();
  const year: number = date.getFullYear();

  const formattedDate: string = `${day} ${months[monthIndex]}, ${year}`;

  return formattedDate;
};

export { formatDate };