import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
// import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
console.log(`Extended the matchers`)

// == you should add the following import: ==
