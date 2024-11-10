type Name = {
    last_name: string;
    first_name: string;
  };

  export function formatName({ last_name, first_name }: Name): string {
    let last: string;
    let first: string;
  
    if (!last_name && first_name) {
      [last, first] = first_name.replace(/[,]/g, '').split(' ');
    } else {
      last = last_name.replace(/[,]/g, '').split(' ')[0];
      first = first_name || last_name.split(' ').pop() || '';
    }
  
    return `${capitalize(last)} ${capitalize(first)}`;
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }