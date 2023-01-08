/**
 * Helper function that returns a schema version check function.
 * The check function throws an error if the given object's schema version
 * does not match the given version
 */
export const requireSchemaVersion = (version: string | number | null) => {
	return <T extends Record<string, any>>(value: T) => {
		if (!version) return true;

		if (value.schema_version !== version) {
			throw new Error(`schema version mismatch (${value.schema_version} !== ${version})`);
		}

		return true;
	};
};
