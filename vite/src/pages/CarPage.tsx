import BasicForm from "@/components/CarPageForms/BasicForm";
import ExpenditureForm from "@/components/CarPageForms/ExpenditureForm";

export default function CarPage() {
  return (
    <div className="py-10 px-16">
      <h1 className="text-3xl font-bold mb-10">
        <span className="text-slate-500 mr-5">#32</span>Volkswagon
        <span className="text-sm ml-4">Virtus</span>
      </h1>

      <BasicForm />
      <ExpenditureForm />
    </div>
  );
}
