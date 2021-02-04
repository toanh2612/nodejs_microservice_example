import dotenv from 'dotenv';
import path from 'path';

try {
	dotenv.config();
	if (process.env.NODE_ENV) {
		dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });
	} else {
		dotenv.config();
	}
} catch (error) {
	dotenv.config();
}
const CONFIG = { ...process.env };
CONFIG.ROOT_DIR = process.cwd();
export default CONFIG;