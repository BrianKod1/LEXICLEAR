import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ExternalLink,
  FileText,
  Globe,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react-native";

const webUrl = process.env.EXPO_PUBLIC_WEB_URL || "https://lexiclear.app";
const demoUrl = `${webUrl}/demo`;

export default function Index() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Search color="#fff" size={20} />
        </View>
        <Text style={styles.brand}>LexiClear</Text>
      </View>

      <View style={styles.hero}>
        <View style={styles.badge}>
          <Zap color="#15803d" size={13} />
          <Text style={styles.badgeText}>AI legal text explainer</Text>
        </View>
        <Text style={styles.title}>Understand contracts before you sign.</Text>
        <Text style={styles.subtitle}>
          Paste legal text, review plain-English summaries, spot red flags, and
          learn the jargon that matters.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => Linking.openURL(demoUrl)}
        >
          <FileText color="#fff" size={18} />
          <Text style={styles.primaryButtonText}>Open demo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => Linking.openURL(`${webUrl}/embed`)}
        >
          <Globe color="#2563eb" size={18} />
          <Text style={styles.secondaryButtonText}>Company embed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cards}>
        {[
          {
            title: "Plain English",
            body: "Dense clauses become short explanations people can act on.",
          },
          {
            title: "Risk Flags",
            body: "Green, yellow, and red labels highlight what deserves attention.",
          },
          {
            title: "Embeddable",
            body: "Companies can add LexiClear to websites and app flows.",
          },
        ].map((item) => (
          <View key={item.title} style={styles.card}>
            <ShieldCheck color="#2563eb" size={18} />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.disclaimer}>
        AI-generated summaries are educational and are not professional legal
        advice.
      </Text>

      <View style={styles.footerLinks}>
        <TouchableOpacity
          style={styles.footerLink}
          onPress={() => Linking.openURL(`${webUrl}/privacy`)}
        >
          <ExternalLink color="#2563eb" size={13} />
          <Text style={styles.footerLinkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerLink}
          onPress={() => Linking.openURL(`${webUrl}/terms`)}
        >
          <ExternalLink color="#2563eb" size={13} />
          <Text style={styles.footerLinkText}>Terms</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 24,
    paddingTop: 64,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  hero: {
    marginBottom: 26,
  },
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  badgeText: {
    color: "#15803d",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },
  subtitle: {
    color: "#4b5563",
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    gap: 12,
    marginBottom: 28,
  },
  primaryButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "700",
  },
  cards: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardBody: {
    color: "#6b7280",
    fontSize: 13,
    lineHeight: 19,
  },
  disclaimer: {
    color: "#6b7280",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 24,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 18,
    marginTop: 18,
    paddingBottom: 24,
  },
  footerLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  footerLinkText: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "700",
  },
});
