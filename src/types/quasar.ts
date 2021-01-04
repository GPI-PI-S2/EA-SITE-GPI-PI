export interface Pagination {
	sortBy?: 'asc' | 'desc';
	descending?: boolean;
	page: number;
	rowsPerPage: number;
	rowsNumber: number;
}
export interface Column<T extends unknown> {
	name: keyof T;
	required?: boolean;
	label?: string;
	align?: 'left' | 'center' | 'right';
	field?: (arg0: T) => string;
	format?: (arg0: string) => string;
	sortable?: boolean;
}
