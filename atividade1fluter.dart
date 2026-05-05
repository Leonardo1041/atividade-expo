import 'package:flutter/material.dart';

void main() => runApp(
  const MaterialApp(
    home: CalculadoraInvestimento(),
    debugShowCheckedModeBanner: false,
  ),
);

class CalculadoraInvestimento extends StatefulWidget {
  const CalculadoraInvestimento({super.key});

  @override
  _CalculadoraInvestimentoState createState() =>
      _CalculadoraInvestimentoState();
}

class _CalculadoraInvestimentoState extends State<CalculadoraInvestimento> {
  final TextEditingController _valorInicialController = TextEditingController();
  final TextEditingController _aporteController = TextEditingController();
  final TextEditingController _taxaController = TextEditingController();
  final TextEditingController _mesesController = TextEditingController();

  String _resultado = 'Informe os valores';
  Color _corResultado = Colors.black;

  _limpar() {
    _valorInicialController.clear();
    _aporteController.clear();
    _taxaController.clear();
    _mesesController.clear();

    setState(() {
      _resultado = 'Informe os valores';
      _corResultado = Colors.black;
    });
  }

  _calcular() {
    setState(() {
      double? P = double.tryParse(_valorInicialController.text);
      double? A = double.tryParse(_aporteController.text);
      double? taxa = double.tryParse(_taxaController.text);
      int? n = int.tryParse(_mesesController.text);

      if (P == null || A == null || taxa == null || n == null || n <= 0) {
        _resultado = 'Valores inválidos';
        return;
      }

      double i = taxa / 100;

      // calcula (1 + i)^n
      double fator = 1;
      for (int k = 0; k < n; k++) {
        fator *= (1 + i);
      }

      double M;

      if (i == 0) {
        // evita divisão por zero
        M = P + (A * n);
      } else {
        M = P * fator + A * ((fator - 1) / i);
      }

      double totalInvestido = P + (A * n);

      _resultado = 'Montante: R\$ ${M.toStringAsFixed(2)}';

      if (M > totalInvestido * 2) {
        _corResultado = Color(0xFF00A86B);
      } else {
        _corResultado = Colors.black;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Calculadora de Investimentos'),
        centerTitle: true,
        backgroundColor: Colors.green,
        actions: [IconButton(icon: Icon(Icons.refresh), onPressed: _limpar)],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20.0),
        child: Column(
          children: [
            Icon(Icons.attach_money, size: 100, color: Colors.green),

            TextField(
              controller: _valorInicialController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Valor Inicial (R\$)',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),

            TextField(
              controller: _aporteController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Aporte Mensal (R\$)',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),

            TextField(
              controller: _taxaController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Taxa (%)',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),

            TextField(
              controller: _mesesController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Meses',
                border: OutlineInputBorder(),
              ),
            ),

            SizedBox(height: 30),

            ElevatedButton(onPressed: _calcular, child: Text('Calcular')),

            SizedBox(height: 20),

            Text(
              _resultado,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: _corResultado,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
