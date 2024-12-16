export const getFormattedDate = (dateString) => {    
    if (!dateString) return "Tarix mövcud deyil";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Tarix mövcud deyil";
    }

    const day = String(date.getDate()).padStart(2, '0');
    const months = [
        'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
        'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
    ];
    const month = months[date.getMonth()];
    const year = String(date.getFullYear());

    return `${day} ${month} ${year}`;
};
