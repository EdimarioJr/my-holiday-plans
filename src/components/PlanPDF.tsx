import { IHolidayPlan } from "@/core/entities";
import {
  Document,
  Page,
  Text,
  View,
  pdf,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  text: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: 700,
    fontFamily: "Times-Roman",
  },
  infoText: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Times-Roman",
  },

  column: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
    padding: 5,
    alignItems: "flex-start",
  },
  planColumn: {
    display: "flex",
    flexDirection: "column",
    margin: 12,
    width: "100%",
  },
  infoRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    justifyContent: "space-between",
  },
});

export type DownloadPlansParams = { plans: IHolidayPlan[] };

const NewDocument = ({ plans }: DownloadPlansParams) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>My holiday plans</Text>
        <View style={styles.column}>
          {plans.map((plan) => (
            <View key={plan.id} style={styles.planColumn}>
              <View style={styles.infoRow}>
                <Text style={styles.text}>Title</Text>
                <Text style={styles.infoText}>{plan.title}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.text}>Description</Text>
                <Text style={styles.infoText}>{plan.description}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.text}>Location</Text>
                <Text style={styles.infoText}>{plan.location}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.text}>Participant</Text>
                <Text style={styles.infoText}>{plan.participant}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.text}>Date</Text>
                <Text style={styles.infoText}>{plan.date.toUTCString()}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export const downloadPlan = async ({ plans }: DownloadPlansParams) => {
  const pdfBlob = await pdf(NewDocument({ plans })).toBlob();
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `print_holidays.pdf`);
  document.body.appendChild(link);
  link.click();
};
