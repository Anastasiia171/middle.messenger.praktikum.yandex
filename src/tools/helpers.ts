import { UpdateProfileRequest } from "../api/types";

export type Indexed<T = any> = {
  [key in string]: T;
};

export const isPlainObject = (value: unknown): value is Indexed => {
  return (
    typeof value === "object" &&
    value !== null &&
    (value.constructor === Object || value.constructor === undefined) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
};

export const isArray = (value: unknown): value is [] => {
  return Array.isArray(value);
};

export const isArrayOrObject = (value: unknown): value is [] | Indexed => {
  return isPlainObject(value) || isArray(value);
};

export const isEqual = (lhs: Indexed, rhs: Indexed) => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }

      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
};

export const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown => {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(object as Indexed, result);
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (let p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};

export function filterEmptyStrings(data: UpdateProfileRequest) {
  const filteredData = {} as UpdateProfileRequest;
  for (const key in data) {
    if (data[key] && data[key]!.trim() !== "") {
      filteredData[key] = data[key];
    }
  }
  return filteredData;
}
