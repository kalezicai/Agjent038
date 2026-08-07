import sq from "../../messages/sq.json";
import en from "../../messages/en.json";
import de from "../../messages/de.json";
import fr from "../../messages/fr.json";
import it from "../../messages/it.json";

const messages = { sq, en, de, fr, it } as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticMessages(locale: string): Promise<Record<string, any>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (messages as Record<string, Record<string, any>>)[locale] ?? messages.sq;
}
